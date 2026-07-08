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
    <div>

      <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white" htmlFor={name}>
        {label}
        {required && <span className="highlight"> *</span>}
      </label>

      <div className="flex items-center gap-4">

        <input
          id={name}
          type="range"
          min={min}
          max={max}
          name={name}
          onChange={onChange}
          value={value || min}
          className="h-2 flex-1 cursor-pointer accent-[#1F8A70]"
        />

        <span className="min-w-[3rem] rounded-lg bg-[#1F8A70]/10 px-3 py-1 text-center text-sm font-semibold text-[#1F8A70] dark:bg-[#1F8A70]/20 dark:text-white">
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