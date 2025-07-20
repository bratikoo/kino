import type { ApiSchemas } from "@/shared/api";
import { Badge } from "@/shared/ui/kit/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/kit/card";
import { Star } from "lucide-react";
import { MovieCardSkeleton } from "./movie-card-skeleton";
import { MovieNotFound } from "./movie-not-found";

interface Props {
  movie?: ApiSchemas["MovieDtoV1_4"];
  isLoading?: boolean;
  isError?: boolean;
}

export const MovieCard = ({
  movie,
  isLoading = false,
  isError = false,
}: Props) => {
  return (
    <Card className="overflow-hidden p-4 flex-3">
      {isLoading ? (
        <MovieCardSkeleton />
      ) : isError ? (
        <MovieNotFound />
      ) : (
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div className="aspect-[2/3] relative">
            <img
              src={movie?.poster?.url ?? ""}
              alt={movie?.name ?? ""}
              className="object-cover absolute inset-0 size-full rounded-xl"
            />
          </div>
          <div className="p-6 md:p-8">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-baseline gap-3">
                <CardTitle className="text-2xl">{movie?.name}</CardTitle>
                <span className="text-muted-foreground">{movie?.year}</span>
              </div>
              {movie?.alternativeName && (
                <CardDescription>
                  {movie?.alternativeName}{" "}
                  {movie?.ageRating && (
                    <Badge className="ml-2" variant="outline">
                      {movie?.ageRating}+
                    </Badge>
                  )}
                  {movie?.ratingMpaa && (
                    <Badge className="ml-1" variant="outline">
                      {movie?.ratingMpaa?.toUpperCase()}
                    </Badge>
                  )}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {movie?.description && (
                <p className="text-pretty text-sm">{movie?.description}</p>
              )}
              <div className="flex flex-wrap gap-4">
                {movie?.rating?.kp && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Рейтинг KP
                    </div>
                    <div className="font-medium flex gap-2">
                      <Star className="text-yellow-400" />
                      {movie?.rating.kp.toFixed(1)}
                    </div>
                  </div>
                )}
                {movie?.rating?.imdb && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Рейтинг IMDB
                    </div>
                    <div className="font-medium flex gap-2">
                      <Star className="text-yellow-400" />
                      {movie?.rating.imdb.toFixed(1)}
                    </div>
                  </div>
                )}
                {movie?.movieLength && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Длительность
                    </div>
                    <div className="font-medium">{movie?.movieLength} мин.</div>
                  </div>
                )}
              </div>
            </CardContent>
            {movie?.genres && movie?.genres?.length > 0 && (
              <CardFooter className="p-0 mt-6">
                <div className="flex flex-wrap gap-2">
                  {movie?.genres.map((genre) => (
                    <Badge
                      key={genre.name}
                      className="px-2.5 py-1 bg-muted rounded-md text-sm"
                      variant="outline"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
