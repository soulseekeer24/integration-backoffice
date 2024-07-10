import * as React from 'react';

export interface CardProps extends React.PropsWithChildren{
    header?: React.ReactNode
    actions?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({children,header,actions}) => {
    return (
        <div className="bg-white shadow shadow-[#1e3a8a]">
            {header}
            <div className='p-4 m-2 rounded bg-white 	'>
                {children}
            </div>
        </div>
    )
}
