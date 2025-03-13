import { Select } from "antd";

interface CustomSelectProps {
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (value: string | null) => void;
  onSearch: (value: string) => void;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  placeholder,
  options,
  onChange,
  onSearch,
  disabled = false,
}) => {
  const extendedOptions = [{ value: "all", label: "All" }, ...options];

  return (
    <div style={{ marginBottom: "10px" }}>
      <label
        style={{
          display: "block",
          fontSize: "12px",
          color: "#666",
          marginBottom: "4px",
        }}
      >
        {label}
      </label>
      <Select
        placeholder={placeholder}
        style={{ width: "100%" }}
        showSearch
        optionFilterProp="label"
        onChange={(value) => onChange(value === "all" ? null : value)}
        onSearch={onSearch}
        options={extendedOptions}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomSelect;
