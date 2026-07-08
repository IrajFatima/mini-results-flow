import type React from "react";

type RadioOption = {
    label: string,
    value: string
};

type RadioGroupProps = {
    name: string;
    label: string;
    value: string;
    required?: boolean;
    options: RadioOption[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioGroup({
    name,
    label,
    required = false,
    options,
    value,
    onChange,
}: RadioGroupProps) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold tracking-wide text-[#183B49] dark:text-white" htmlFor={name}>
                {label}
                {required && <span className="highlight"> *</span>}
            </label>

            <div className="flex flex-wrap gap-4">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                        htmlFor={`${name}-${option.value}`}
                    >
                        <input
                            type="radio"
                            id={`${name}-${option.value}`}
                            name={name}
                            value={option.value}
                            checked={value == option.value}
                            className="h-5 w-5 accent-[#1F8A70]"
                            onChange={onChange}
                        />

                        <span className="text-sm font-medium text-black dark:text-white">
    {option.label}
</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default RadioGroup;