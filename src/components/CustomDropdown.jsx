import React, { useState, useEffect, useRef } from "react";
import dropDownIcon from '../assets/drop_down.svg';

const CustomDropdown = ({
                            options = [],
                            value,
                            onChange,
                            placeholder = "Select",
                            disabled = false,
                            enableFilter = false
                        }) => {
    const [open, setOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
                setIsFocused(false);
                setSearchTerm("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(o => o.value === value);
    const isFloating = Boolean(selectedOption || searchTerm) || isFocused;

    const displayedOptions = enableFilter
        ? searchTerm
            ? options.filter(o => o.label.toLowerCase().includes(searchTerm.toLowerCase()))
            : options
        : options;

    return (
        <div className="relative w-full" ref={containerRef}>
            <div className="relative">
                {enableFilter ? (
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setOpen(true); setIsFocused(true); }}
                        disabled={disabled}
                        placeholder=" "
                        className={`w-full border border-gray-400 rounded-md py-2 px-3 text-sm sm:text-base focus:outline-none ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        onFocus={() => { setOpen(true); setIsFocused(true); }}
                    />
                ) : (
                    <div
                        className={`flex items-center justify-between border border-gray-400 rounded-md py-2 px-3 bg-white select-none ${disabled ? 'bg-gray-100 opacity-70' : 'cursor-pointer'}`}
                        onClick={() => !disabled && setOpen(o => !o)}
                    >
                        <span className={`${selectedOption ? 'text-gray-700' : 'text-gray-400'} text-sm sm:text-base`}>
                            {selectedOption ? selectedOption.label : ""}
                        </span>
                        <img src={dropDownIcon} alt="Dropdown" className="w-4 h-4" />
                    </div>
                )}

                <label className={`absolute left-3 transition-all duration-200 pointer-events-none bg-white px-1 ${
                    isFloating ? 'top-[-0.5rem] text-xs text-gray-600' : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
                }`}>
                    {placeholder}
                </label>
            </div>

            {open && !disabled && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-40 overflow-auto z-50">
                    {displayedOptions.map((option, index) => (
                        <div
                            key={option.value}
                            onClick={() => { onChange(option.value); setOpen(false); setIsFocused(false); setSearchTerm(option.label); }}
                            className={`px-3 py-2 cursor-pointer text-sm sm:text-base border-b last:border-b-0 hover:bg-gray-50`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
