import React from "react";
import { Controller } from "react-hook-form";

const CustomInput = ({
  type = "text",
  name,
  placeholder = "Name *",
  control,
  rules = {},
  defaultValue = "",
  className = "",
  onChange,
  onBlur,
  disabled = false,
  errors
}) =>{
    
    return (
    
    
  <div className="form-input mb-3">
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <input
          {...field}                       /* value, onChange, onBlur, name, ref */
          type={type}
          placeholder={placeholder}
          className={`form-control ${className}`}
          disabled={disabled}
          onChange={(e) => {
            field.onChange(e);             // keep RHF in sync
            onChange?.(e);                 // optional external handler
          }}
          onBlur={(e) => {
            field.onBlur();                // RHF blur
            onBlur?.(e);                   // optional external handler
          }}
        />
    )}
    />
    {errors && <span className="text-danger fs-7">{errors.message}</span>}
  </div>
)};

export default CustomInput;
