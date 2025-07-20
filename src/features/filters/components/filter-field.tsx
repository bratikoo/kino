import {
  FormSelectField,
  FormInputField,
  FormRangeSliderField,
} from "@/shared/ui/kit/form-fields";
import type { Control } from "react-hook-form";
import type { FilterForm } from "../hooks/use-movie-filters";
import type { FilterFieldConfig } from "../config/filter-fields";

type FilterFieldProps = {
  config: FilterFieldConfig;
  control: Control<FilterForm>;
};

export function FilterField({ config, control }: FilterFieldProps) {
  switch (config.type) {
    case "select":
      return (
        <FormSelectField
          control={control}
          name={config.name as keyof FilterForm}
          label={config.label}
          placeholder={config.placeholder!}
          options={config.options!}
          isArray={config.isArray}
          clearable={config.clearable}
        />
      );

    case "input":
      return (
        <FormInputField
          control={control}
          name={config.name as keyof FilterForm}
          label={config.label}
          placeholder={config.placeholder!}
          className={config.className}
        />
      );

    case "range-slider":
      return (
        <FormRangeSliderField
          control={control}
          name={config.name as keyof FilterForm}
          label={config.label}
          min={config.min!}
          max={config.max!}
          step={config.step}
          minLabel={config.minLabel}
          maxLabel={config.maxLabel}
        />
      );

    default:
      return null;
  }
}
