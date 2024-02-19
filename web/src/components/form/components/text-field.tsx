import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TextFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  description?: string | ReactNode;
  defaultValue?: string | number;
  disabled?: boolean;
  className?: string;
}

const TextField = ({
  name,
  label,
  placeholder,
  description,
  className = "",
  type = "text",
  defaultValue = "",
  disabled = false,
}: TextFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
