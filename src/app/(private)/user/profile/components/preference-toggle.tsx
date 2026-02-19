import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui";
import type { PreferenceToggleProps } from "@/types";

export function PreferenceToggle({ control, name, label, description }: PreferenceToggleProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-muted/60 px-4 py-3">
          <div>
            <FormLabel className="text-sm font-semibold text-navy">{label}</FormLabel>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <FormControl>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
                aria-label={label}
              />
              <span className="h-6 w-11 rounded-full bg-muted-foreground/30 transition peer-checked:bg-primary" />
              <span className="absolute top-1 left-1 size-4 rounded-full bg-white transition peer-checked:translate-x-5" />
            </label>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
