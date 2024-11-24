import React from "react";

interface TextInputProps {
    label: string;
    value: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    
}

const TextInput: React.FC<TextInputProps> = ({ label, value, type, placeholder, error, onChange, ...rest }) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input aria-label={placeholder} placeholder={placeholder} autoCapitalize="true" type={type} value={value} onChange={onChange} {...rest} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default TextInput