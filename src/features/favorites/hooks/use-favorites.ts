import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { useSession } from "@/shared/model/auth";

export interface FavoriteMovie {
  id: number;
  user_id: string;
  external_id: number;
  name: string | null;
  alternativeName: string | null;
  year: number | null;
  type: string | null;
  description: string | null;
  poster: {
    url?: string | null;
    previewUrl?: string | null;
  } | null;
  rating: {
    kp?: number | null;
    imdb?: number | null;
    tmdb?: number | null;
  } | null;
  genres: Array<{ name?: string }> | null;
  countries: Array<{ name?: string }> | null;
  created_at: string;
}

export const useFavorites = () => {
  const { session } = useSession();

  return useQuery({
    queryKey: ["favorites", session?.user?.id],
    queryFn: async (): Promise<FavoriteMovie[]> => {
      if (!session?.user?.id) {
        return [];
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Error fetching favorites: ${error.message}`);
      }

      return data || [];
    },
    enabled: !!session?.user?.id,
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();

  return useMutation({
    mutationFn: async (favoriteId: number) => {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", favoriteId);

      if (error) {
        throw new Error(`Error removing from favorites: ${error.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", session?.user?.id],
      });
    },
  });
};
