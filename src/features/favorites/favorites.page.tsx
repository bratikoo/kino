import { useFavorites } from "./hooks/use-favorites";
import { FavoriteMovieCard } from "./favorite-movie-card";

import { Skeleton } from "@/shared/ui/kit/skeleton";
import { Card, CardContent } from "@/shared/ui/kit/card";
import { Bookmark, Heart } from "lucide-react";

const FavoritesPage = () => {
  const { data: favorites, isLoading, error } = useFavorites();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-[200px_1fr] gap-4">
                    <Skeleton className="aspect-[2/3] w-full" />
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-16 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Ошибка загрузки</h2>
          <p className="text-muted-foreground">
            Не удалось загрузить избранные фильмы. Попробуйте обновить страницу.
          </p>
        </div>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Избранные фильмы</h1>
        </div>
        <div className="text-center py-12">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Нет избранных фильмов</h2>
          <p className="text-muted-foreground">
            Добавьте фильмы в избранное, чтобы они отображались здесь
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="h-6 w-6 text-red-500 fill-red-500" />
        <h1 className="text-2xl font-bold">Избранные фильмы</h1>
      </div>

      <div className="grid gap-4">
        {favorites.map((movie) => (
          <FavoriteMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export const Component = FavoritesPage;
