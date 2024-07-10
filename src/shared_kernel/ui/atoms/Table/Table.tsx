import * as React from 'react'


export interface Column {
    header: string;
    property: string;
}

export interface TableProps {
    columns: Column[]
    data: any[]

    //actions
    onRowClick?: (item: any) => void
}

const getObjectPropertyValue = (path: string, obj: any, separator = '.') => {
    let properties = Array.isArray(path) ? [path] : path.split(separator)
    return properties.reduce((prev: any, curr: any) => prev?.[curr], obj)
}
export const Table: React.FC<TableProps> = ({columns, data, onRowClick}) => {
    return (
        <table className="table-fixed  w-full  border border-slate-500 p-2">
            <thead>
            <tr className="bg-blue-500 text-white">
                {columns.map(c => <th key={c.header} className="py-3 px-4 text-left">{c.header}</th>)}
            </tr>
            </thead>
            <tbody className="divide-y divide-blue-200">
            {data.map(d => <tr onClick={() => onRowClick ? onRowClick(d) : null}
                               className="cursor-pointer hover:bg-purple-100">
                {columns.map(c => <td key={c.property}
                                      className="py-3 px-4 overflow-hidden">{getObjectPropertyValue(c.property, d)}</td>)}</tr>)}

            </tbody>
        </table>

    )
}
