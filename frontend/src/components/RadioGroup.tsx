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
        <div className="mb-6">
            <label className="block mb-3" htmlFor={name}>
                {label}
                {required && <span className="highlight"> *</span>}
            </label>

            <div className="flex gap-6">
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
                            className="w-5 h-5 accent-[#183B49]"
                            onChange={onChange}
                        />

                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default RadioGroup;