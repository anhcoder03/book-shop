import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        checked={checked}
        type="radio"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        {checked ? (
          <span className="fa fa-star w-[35px] text-2xl text-primary"></span>
        ) : (
          <span className="w-[35px] text-3xl text-primary">☆</span>
        )}
      </div>
    </label>
  );
};

export default Radio;
