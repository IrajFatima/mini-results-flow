type SliderProps = {
  label: string;
  name: string,
  min: number;
  max: number;
  value: number | null;
  required?: boolean;
  helperText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Slider({
  label,
  min,
  name,
  max,
  value,
  required = false,
  helperText,
  onChange,
}: SliderProps) {
  return (
    <div className="mb-7">

      <label className="block mb-2" htmlFor={name}>
        {label}
        {required && <span className="highlight"> *</span>}
      </label>

      <div className="flex items-center gap-5">

        <input
          id={name}
          type="range"
          min={min}
          max={max}
          name={name}
          onChange={onChange}
          value={value || min}
          className="flex-1 accent-[#36BC9F]"
        />

        <span className="text-xl w-10 text-right">
          {value}
        </span>

      </div>

      {helperText && (
        <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
          {helperText}
        </p>
      )}

    </div>
  );
}

export default Slider;