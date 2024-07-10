import React, {ChangeEvent, HTMLInputTypeAttribute, useState} from "react";
import {InputHTMLAttributes} from "react"


export function useField<T>(initValue: T, onValueUpdate?: (value: T) => void) {
    const [value, setValue] = useState(initValue)

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value as T);
        if (onValueUpdate) {
            onValueUpdate(ev.target.value as T);
        }
    }

    const clear = () => {
        setValue(initValue);
    }

    return {
        value,
        onChange,
        setValue,
        clear,
    }
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    labelFor: string;
    type: HTMLInputTypeAttribute;
    //
    clear?: () => void;
}

const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

export const Input: React.FC<InputProps> = ({type, ...props}) => {
    return (
        <>
            <label htmlFor={props.labelFor} className="block">
                <span className="text-gray-700">{props.labelText}</span>
                <input {...props} type={type} className={fixedInputClass} />
            </label>
        </>
    )
}
