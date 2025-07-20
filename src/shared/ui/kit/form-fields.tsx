import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "./select";
import { Separator } from "./separator";
import { Button } from "./button";
import { Input } from "./input";
import { Slider } from "./slider";

type SelectOption = {
  value: string;
  label: string;
};

type FormSelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder: string;
  options: SelectOption[];
  isArray?: boolean;
  clearable?: boolean;
};

export function FormSelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  options,
  isArray = false,
  clearable = false,
}: FormSelectFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={
                isArray && Array.isArray(field.value)
                  ? field.value[0] || ""
                  : field.value || ""
              }
              onValueChange={(val) => {
                if (isArray) {
                  field.onChange(val ? [val] : []);
                } else {
                  field.onChange(val || undefined);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
                {clearable && (
                  <>
                    <Separator className="my-1" />
                    <div className="px-2 pb-2 pt-1">
                      <Button
                        className="w-full"
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => {
                          field.onChange(isArray ? [] : undefined);
                        }}
                      >
                        Очистить
                      </Button>
                    </div>
                  </>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormInputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder: string;
  className?: string;
};

export function FormInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  className,
}: FormInputFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormRangeSliderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  min: number;
  max: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
};

export function FormRangeSliderField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  min,
  max,
  step = 0.1,
  minLabel,
  maxLabel,
}: FormRangeSliderFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="w-full flex items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">
                {minLabel || min}
              </span>
              <Slider
                min={min}
                max={max}
                step={step}
                value={field.value}
                onValueChange={field.onChange}
              />
              <span className="text-sm text-muted-foreground">
                {maxLabel || max}
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
