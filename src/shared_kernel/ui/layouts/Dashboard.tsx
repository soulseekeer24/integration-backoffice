import React from "react";

export interface DashboardLayoutProps {
    children: React.ReactNode,
    header: React.ReactNode,
    sidebar: React.ReactNode,
    hideSidebar?: boolean
}


export const DashboardLayout: React.FC<DashboardLayoutProps> = ({children, header, sidebar, hideSidebar = false}) => {
    return (
        <>
            <header>

                {header}
            </header>
            <div className="flex h-full">
                {!hideSidebar ?
                    <div className='w-60  flex'>
                        {sidebar}
                    </div> : null}

                <div className="flex w-full justify-center ">
                    {children}
                </div>
            </div>
        </>);
}
