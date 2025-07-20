import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useDebouncedValue } from "@/shared/lib/react";

const filterSchema = z.object({
  rating: z.tuple([z.number().min(0).max(10), z.number().min(0).max(10)]),
  genres: z.array(z.string()).optional(),
  countries: z.array(z.string()).optional(),
  type: z.string().optional(),
  year: z
    .union([z.string().regex(/^\d{4}$/), z.string().regex(/^\d{4}-\d{4}$/)])
    .optional(),
});

export type FilterForm = z.infer<typeof filterSchema>;

type UseMovieFiltersProps = {
  onChange?: (filters: Record<string, unknown>) => void;
};

export function useMovieFilters({ onChange }: UseMovieFiltersProps) {
  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      rating: [6, 10],
      genres: [],
      countries: [],
      type: undefined,
      year: undefined,
    },
  });

  const values = form.watch();
  const debouncedRating = useDebouncedValue(values.rating, 300);
  const prevQueryRef = useRef<string>("");

  useEffect(() => {
    const query = buildQuery({
      rating: debouncedRating,
      genres: values.genres,
      countries: values.countries,
      type: values.type,
      year: values.year,
    });

    const queryStr = JSON.stringify(query);
    if (queryStr !== prevQueryRef.current) {
      prevQueryRef.current = queryStr;
      onChange?.(query);
    }
  }, [
    debouncedRating,
    values.genres,
    values.countries,
    values.type,
    values.year,
    onChange,
  ]);

  return {
    form,
  };
}

function buildQuery(values: {
  rating?: [number, number];
  genres?: string[];
  countries?: string[];
  type?: string;
  year?: string;
}): Record<string, unknown> {
  const query: Record<string, unknown> = {};

  if (values.rating) {
    query["rating.kp"] = [`${values.rating[0]}-${values.rating[1]}`];
  }

  if (values.genres && values.genres.length > 0) {
    query["genres.name"] = values.genres;
  }

  if (values.countries && values.countries.length > 0) {
    query["countries.name"] = values.countries;
  }

  if (values.type) {
    query["type"] = [values.type];
  }

  if (values.year) {
    query["year"] = [values.year];
  }

  return query;
}
