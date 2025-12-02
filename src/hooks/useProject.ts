import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    enabled: !!id,

    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Supabase Error:", error);
        throw error;
      }

      if (!data) return null;


      // ⭐ Tell TypeScript these fields exist
      type ProjectType = {
        features?: any[];
        tools?: any[];
        deliverables?: any[];
      };
      const typedData = data as unknown as ProjectType;

      return {
        id: data.id,
        title: data.title,
        description: data.short_description,
        fullDescription: data.full_description,
        price: data.price,
        category: data.category,
        image: data.thumbnail_url,
        zip_url: data.zip_url,

        // ⭐ SAFE ARRAYS - NO RED UNDERLINE POSSIBLE NOW
        features: Array.isArray(typedData.features) ? typedData.features : [],
        tools: Array.isArray(typedData.tools) ? typedData.tools : [],
        deliverables: Array.isArray(typedData.deliverables)
          ? typedData.deliverables
          : [],
      };
    },
  });
};
