import { rqClient } from "@/shared/api/instance";
import { Button } from "@/shared/ui/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import { Separator } from "@/shared/ui/kit/separator";
import { Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/shared/ui/kit/badge";

const HomePage = () => {
  const [filters, setFilters] = useState({
    lists: ["top250"],
    ratingFrom: 7,
    year: "all",
  });

  const randomMovie = rqClient.useQuery(
    "get",
    "/v1.4/movie/random",
    {
      params: {
        query: {
          lists: filters.lists,
          ...(filters.year !== "all" ? { year: [filters.year] } : {}),
        },
      },
    },
    {
      enabled: false,
    }
  );

  const handleGetRandomMovie = async () => {
    await randomMovie.refetch();
  };

  return (
    <div className="container flex gap-2 justify-between w-full">
      <div className="w-[250px] px-2">
        <h3>Фильтры</h3>
        <Separator />
        <Button onClick={handleGetRandomMovie}>random</Button>
      </div>
      <Separator orientation="vertical" className="h-full" />
      {randomMovie.data && (
        <Card className="overflow-hidden p-4 flex-3">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="aspect-[2/3] relative">
              <img
                src={randomMovie.data.poster?.url ?? ""}
                alt={randomMovie.data.name ?? ""}
                className="object-cover absolute inset-0 size-full rounded-xl"
              />
            </div>
            <div className="p-6 md:p-8">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-baseline gap-3">
                  <CardTitle className="text-2xl">
                    {randomMovie.data.name}
                  </CardTitle>
                  <span className="text-muted-foreground">
                    {randomMovie.data.year}
                  </span>
                </div>
                {randomMovie.data.alternativeName && (
                  <CardDescription>
                    {randomMovie.data.alternativeName}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {randomMovie.data.description && (
                  <p className="text-pretty">{randomMovie.data.description}</p>
                )}
                <div className="flex flex-wrap gap-4">
                  {randomMovie.data.rating?.kp && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Рейтинг KP
                      </div>
                      <div className="font-medium flex gap-2">
                        <Star className="text-yellow-400" />
                        {randomMovie.data.rating.kp.toFixed(1)}
                      </div>
                    </div>
                  )}
                  {randomMovie.data.rating?.imdb && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Рейтинг IMDB
                      </div>
                      <div className="font-medium flex gap-2">
                        <Star className="text-yellow-400" />
                        {randomMovie.data.rating.imdb.toFixed(1)}
                      </div>
                    </div>
                  )}
                  {randomMovie.data.movieLength && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Длительность
                      </div>
                      <div className="font-medium">
                        {randomMovie.data.movieLength} мин.
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              {randomMovie.data.genres &&
                randomMovie.data.genres?.length > 0 && (
                  <CardFooter className="p-0 mt-6">
                    <div className="flex flex-wrap gap-2">
                      {randomMovie.data.genres.map((genre) => (
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
        </Card>
      )}
    </div>
  );
};

export const Component = HomePage;
