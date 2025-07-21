import { Badge } from "@/shared/ui/kit/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/kit/card";
import { Button } from "@/shared/ui/kit/button";
import { Star, Trash2 } from "lucide-react";
import {
  useRemoveFromFavorites,
  type FavoriteMovie,
} from "./hooks/use-favorites";

interface Props {
  movie: FavoriteMovie;
}

export const FavoriteMovieCard = ({ movie }: Props) => {
  const removeFromFavorites = useRemoveFromFavorites();

  const handleRemove = () => {
    removeFromFavorites.mutate(movie.id);
  };

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-[200px_1fr] gap-4 px-4">
        <div className="aspect-[2/3] relative ">
          <img
            src={movie.poster?.url || "/placeholder-movie.png"}
            alt={movie.name || ""}
            className="object-cover absolute inset-0 size-full rounded-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-movie.png";
            }}
          />
        </div>

        <div className="p-4">
          <CardHeader className="p-0 mb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <CardTitle className="text-lg leading-tight">
                    {movie.name}
                  </CardTitle>
                  {movie.year && (
                    <span className="text-sm text-muted-foreground">
                      {movie.year}
                    </span>
                  )}
                </div>
                {movie.alternativeName && (
                  <CardDescription className="mt-1">
                    {movie.alternativeName}
                  </CardDescription>
                )}
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={removeFromFavorites.isPending}
                className="ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-3">
            {movie.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {movie.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3 text-sm">
              {!!movie.rating?.kp && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span className="font-medium">
                    {movie.rating.kp.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">KP</span>
                </div>
              )}
              {!!movie.rating?.imdb && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span className="font-medium">
                    {movie.rating.imdb.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">IMDB</span>
                </div>
              )}
            </div>
          </CardContent>

          {movie.genres && movie.genres.length > 0 && (
            <CardFooter className="p-0 mt-3">
              <div className="flex flex-wrap gap-1">
                {movie.genres.map((genre, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs px-2 py-0.5"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          )}
        </div>
      </div>
    </Card>
  );
};
