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

        // Check downloads table
        const { data: download, error: downloadError } = await supabaseClient
            .from('downloads')
            .select('*')
            .eq('project_id', projectId)
            .eq('user_email', user.email)
            .maybeSingle()

        if (downloadError) {
            console.error("Download check error:", downloadError);
            throw new Error("Error checking download permissions");
        }

        if (!download) {
            return new Response(
                JSON.stringify({ error: 'You do not own this project' }),
                { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Generate Public URL
        const { data } = supabaseClient.storage
            .from('project-files')
            .getPublicUrl(`${projectId}/project.zip`)

        return new Response(
            JSON.stringify({ url: data.publicUrl }),
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
