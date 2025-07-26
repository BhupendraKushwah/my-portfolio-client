import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

const CustomSelectField = ({
  control,
  name,
  options,
  placeholder = 'Select...',
  isMulti = false,
  rules = {},
  defaultValue = null }) => {
  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#21294a',      // Selected option highlight, active border, and checkmark
      primary25: '#1b1e32',    // Background color for hovered options
      primary50: '#21294a',    // Background color for selected-but-not-focused options
      neutral0: '#101323',     // Control background color
      neutral80: '#ffffff',    // Main text color (option text, input text)
      neutral20: '#21294a',    // Border color of the select control
    },
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <div>
          <Select
            {...field}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder}
            theme={customTheme}
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={(val) => field.onChange(isMulti ? val.map(v => v.value) : val?.value)}
            value={
              isMulti
                ? options.filter((opt) => field.value?.includes(opt.value))
                : options.find((opt) => opt.value === field.value)
            }
          />
          {fieldState?.error && (
            <p className="fs-7 text-danger">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default CustomSelectField;
