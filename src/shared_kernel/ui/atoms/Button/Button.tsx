import * as React from 'react';

export interface ButtonProps {
    label: string;
    onClick?: () => void
    className?: string | undefined;
}

export const Button: React.FC<ButtonProps> = ({label, onClick,className}) => {
    return (
        <button className={`bg-blue-800 text-white p-2 w-full h-10 ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};
