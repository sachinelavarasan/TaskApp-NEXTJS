import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

import PropTypes from "prop-types";

export const DatePicker = ({
  autoFocus,
  className,
  errorMessage,
  isLarge,
  dateFormat,
  label,
  maxWidth,
  minWidth,
  placeholder,
  width,
  value,
  minDate,
  onChange,
  ...rest
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const openDatePicker = () => {
    setIsDatePickerOpen((state) => !state);
  };
  return (
    <div className={className}>
      <label
        className="block text-grey-darker text-[14px] capitalize font-medium mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <ReactDatePicker
        {...rest}
        autoComplete="off"
        placeholderText={placeholder}
        open={isDatePickerOpen}
        onClickOutside={() => setIsDatePickerOpen(false)}
        dateFormat={dateFormat}
        selected={value}
        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none  focus:shadow-outline"
        popperPlacement="bottom"
        popperProps={{
          positionFixed: true,
        }}
        minDate={new Date(minDate)}
        onFocus={() => {
          openDatePicker();
          setIsFocused(true);
        }}
        onSelect={() => {
          openDatePicker();
          setIsFocused(false);
        }}
        onBlur={(e) => {
          setIsFocused(false);
        }}
        onChange={onChange}
      />
      {errorMessage ? (
        <p className="text-red-500 text-[14px] mb-0">{errorMessage}</p>
      ) : null}
    </div>
  );
};

DatePicker.defaultProps = {
  autoFocus: false,
  className: "",
  errorMessage: null,
  isLarge: false,
  label: "",
  maxWidth: "",
  minWidth: "",
  value: "",
  placeholder: "",
  dateFormat: "dd-MM-yyyy",
  width: "",
  minDate: "",
  onChange: () => {},
};

DatePicker.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  isLarge: PropTypes.bool,
  label: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  dateFormat: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  value: PropTypes.string,
  minDate: PropTypes.any,
  onChange: PropTypes.func,
};
