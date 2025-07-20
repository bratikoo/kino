import { Form } from "@/shared/ui/kit/form";
import { Separator } from "@/shared/ui/kit/separator";
import { useMovieFilters } from "./hooks/use-movie-filters";
import { FilterField } from "./components/filter-field";
import { FILTER_FIELDS } from "./config/filter-fields";

type MovieFiltersProps = {
  onChange?: (filters: Record<string, unknown>) => void;
};

export function MovieFilters({ onChange }: MovieFiltersProps) {
  const { form } = useMovieFilters({ onChange });

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">Фильтры</h3>

      <Separator />
      <Form {...form}>
        <form className="flex flex-col gap-4">
          {FILTER_FIELDS.map((fieldConfig) => (
            <FilterField
              key={fieldConfig.name}
              config={fieldConfig}
              control={form.control}
            />
          ))}
        </form>
      </Form>
    </div>
  );
}
