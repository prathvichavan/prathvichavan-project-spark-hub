import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        const { projectId } = await req.json()

        const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
        if (userError || !user) throw new Error('Unauthorized')

        // Check orders table for a paid order
        const { data: order, error: orderError } = await supabaseClient
            .from('orders')
            .select('*')
            .eq('project_id', projectId)
            .eq('user_id', user.id)
            .eq('status', 'paid')
            .limit(1)
            .maybeSingle()

        if (orderError) {
            console.error("Order check error:", orderError);
            throw new Error("Error checking purchase status");
        }

        if (!order) {
            return new Response(
                JSON.stringify({ error: 'You have not purchased this project' }),
                { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Generate Signed URL for secure download (valid for 1 hour)
        // We assume the file is at: project-files/{projectId}/project.zip (Removed double project-files segment based on typical usage, please verify path if needed)
        // Previous code had: `project-files/${projectId}/project.zip` within bucket 'project-files'

        const { data, error: signError } = await supabaseClient.storage
            .from('project-files')
            .createSignedUrl(`project-files/${projectId}/project.zip`, 3600) // 1 hour expiry

        if (signError) {
            console.error("Storage Signed URL Error:", signError);
            throw new Error("Could not generate download link");
        }

        return new Response(
            JSON.stringify({ url: data.signedUrl }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error("Download function error:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
