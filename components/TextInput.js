import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import EyeCloseIcon from "../public/eye-close.svg";
import EyeOpenIcon from "../public/eye-open.svg";

export const TextInput = ({
  autoFocus,
  className,
  errorMessage,
  hasError,
  hasFailed,
  hasSucceeded,
  isLarge,
  isLoading,
  label,
  id,
  maxWidth,
  minWidth,
  placeholder,
  type,
  width,
  onChange,
  value,
  ...rest
}) => {
  return (
    <div className={className}>
      <label
        className="block text-grey-darker text-[14px] capitalize font-medium mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none  focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errorMessage ? (
        <p className="text-red-500 text-[14px] mb-0">{errorMessage}</p>
      ) : null}
    </div>
  );
};

TextInput.defaultProps = {
  autoFocus: false,
  className: "",
  errorMessage: null,
  hasError: false,
  hasFailed: false,
  hasSucceeded: false,
  isLarge: false,
  isLoading: false,
  label: "",
  id: "",
  maxWidth: "",
  minWidth: "",
  placeholder: "",
  type: "text",
  width: "",
};

TextInput.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  hasFailed: PropTypes.bool,
  hasSucceeded: PropTypes.bool,
  isLarge: PropTypes.bool,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
};
