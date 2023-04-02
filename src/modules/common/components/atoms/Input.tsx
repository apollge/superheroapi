import React, { forwardRef, useId } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = "", type = "text", onChange }, ref) => {
    const id = useId();

    return (
      <input
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        type={type}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
