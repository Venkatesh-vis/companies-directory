import React, { useId, useState } from 'react';

const CustomTextField = ({
                             label,
                             value = '',
                             onChange,
                             maxLength,
                             errorText,
                             showCharecterLimit,
                             multiline,
                             rows,
                             type = 'text',
                             readOnly = false,
                             format = false
                         }) => {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);

    const isFloating = value?.length > 0 || isFocused || type === 'date' || type === 'time';

    const handleChange = (e) => {
        if (readOnly) return;
        let val = e.target.value;

        if (type === 'date' && format) {
            val = val
                ? new Date(val).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })
                : '';
        }

        if (!maxLength || val.length <= maxLength) {
            onChange({ ...e, target: { ...e.target, value: val } });
        }
    };

    const inputClass = `peer w-full py-3 px-3 border border-gray-400 rounded-md text-sm sm:text-base focus:outline-none ${
        readOnly ? 'text-gray-400' : ''
    }`;

    return (
        <div className="relative w-full">
            {multiline ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={handleChange}
                    rows={rows || 3}
                    placeholder=" "
                    className={`${inputClass} resize-none`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    readOnly={readOnly}
                />
            ) : (
                <input
                    id={id}
                    value={value}
                    onChange={handleChange}
                    placeholder=" "
                    type={type}
                    className={inputClass}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    readOnly={readOnly}
                />
            )}

            <label
                htmlFor={id}
                className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-1 transform
                    ${isFloating
                    ? '-top-2 text-xs text-gray-600'
                    : 'top-3 text-sm text-gray-500'
                }`}
            >
                {label}
            </label>

            <div className="flex justify-between mt-1 text-xs sm:text-sm">
                {errorText ? <p className="text-red-500">{errorText}</p> : <span />}
                {showCharecterLimit && <p className="text-gray-500">{value?.length} / {maxLength}</p>}
            </div>
        </div>
    );
};

export default CustomTextField;
