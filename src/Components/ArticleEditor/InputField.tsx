import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    setBorderColor?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    required = false,
    setBorderColor = '',
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                {label}:
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${setBorderColor}`}
            />
        </div>
    );
};

export default InputField;
