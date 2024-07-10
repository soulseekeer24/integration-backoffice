import React from "react";

export interface SelectOptionItem {
    value: any;
    label: string;
}

export interface SelectProps {
    options: SelectOptionItem[];
    labelText: string
    value: any,
    onChange: (value: any) => void
}

const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

export const Select: React.FC<SelectProps> = ({labelText, options, onChange, value}) => {
    return (
        <>
            <label className="block">
                <span className="text-gray-700">{labelText}</span>
                <select value={value} onChange={onChange} className={fixedInputClass}>
                    <option value={""}>Seleccione...</option>
                    {options.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
                </select>
            </label>
        </>
    )
}
