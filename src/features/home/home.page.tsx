import { rqClient } from "@/shared/api/instance";
import { Button } from "@/shared/ui/kit/button";
import { MovieCard } from "../movie/movie-card";
import { type ApiOperations } from "@/shared/api";
import { FastForward } from "lucide-react";
import { useState } from "react";
import { MovieFilters } from "../filters";
import { AddToFavorites } from "../favorites/add-to-favorites";

const HomePage = () => {
  const [filters, setFilters] = useState<
    ApiOperations["MovieController_getRandomMovieV1_4"]["parameters"]["query"]
  >({
    lists: ["top250"],
  });

  const randomMovie = rqClient.useQuery(
    "get",
    "/v1.4/movie/random",
    {
      params: {
        query: filters,
      },
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleGetRandomMovie = async () => {
    await randomMovie.refetch();
  };

  return (
    <div className="flex gap-8 justify-between w-full">
      <MovieFilters onChange={setFilters} />
      <div className="flex flex-col gap-4 justify-between w-full flex-1">
        <MovieCard
          isLoading={randomMovie.isFetching}
          movie={randomMovie.data ?? {}}
          isError={randomMovie.isError}
        />
        <div className="flex gap-2">
          <AddToFavorites movie={randomMovie.data} />
          <Button
            className="rounded-full bg-linear-to-r from-cyan-500 to-blue-500 hover:cursor-pointer"
            onClick={handleGetRandomMovie}
          >
            <FastForward />
            Следующий фильм
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Component = HomePage;
