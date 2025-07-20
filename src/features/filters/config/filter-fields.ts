import { GENRES, COUNTRIES, TYPES } from "@/shared/constants";
import type { FilterForm } from "../hooks/use-movie-filters";

export type FilterFieldConfig = {
  name: keyof FilterForm;
  label: string;
  type: "select" | "input" | "range-slider";
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  isArray?: boolean;
  clearable?: boolean;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
};

export const FILTER_FIELDS: FilterFieldConfig[] = [
  {
    name: "rating",
    label: "Рейтинг КП",
    type: "range-slider",
    min: 0,
    max: 10,
    step: 0.1,
    minLabel: "0",
    maxLabel: "10",
  },
  {
    name: "genres",
    label: "Жанр",
    type: "select",
    placeholder: "Выберите жанр",
    options: GENRES,
    isArray: true,
    clearable: true,
  },
  {
    name: "countries",
    label: "Страна",
    type: "select",
    placeholder: "Выберите страну",
    options: COUNTRIES,
    isArray: true,
    clearable: true,
  },
  {
    name: "type",
    label: "Тип",
    type: "select",
    placeholder: "Выберите тип",
    options: TYPES,
    clearable: true,
  },
  {
    name: "year",
    label: "Год",
    type: "input",
    placeholder: "2020 или 2010-2020",
    className: "flex flex-col",
  },
];
