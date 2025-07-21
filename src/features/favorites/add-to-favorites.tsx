import type { ApiSchemas } from "@/shared/api";
import { supabase } from "@/shared/api/supabase";
import { useSession } from "@/shared/model/auth";
import { Button } from "@/shared/ui/kit/button";
import { Bookmark } from "lucide-react";

export const AddToFavorites = ({
  movie,
}: {
  movie?: ApiSchemas["MovieDtoV1_4"];
}) => {
  const { session } = useSession();

  const handleAddToFavorites = async () => {
    if (!session?.user?.id || !movie) {
      console.error("User not authenticated or movie not provided");
      return;
    }

    try {
      const { error } = await supabase.from("favorites").insert({
        rating: movie.rating,
        external_id: movie.id,
        type: movie.type,
        name: movie.name,
        description: movie.description,
        year: movie.year,
        poster: movie.poster,
        genres: movie.genres,
        countries: movie.countries,
        alternativeName: movie.alternativeName,
      });

      if (error) {
        console.error("Error adding to favorites:", error);
        return;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <Button
      onClick={handleAddToFavorites}
      className="rounded-full bg-linear-to-r from-cyan-500 to-blue-500 hover:cursor-pointer"
    >
      <Bookmark />
    </Button>
  );
};
