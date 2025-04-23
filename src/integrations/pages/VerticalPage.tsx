import {Outlet, useParams} from "react-router-dom";

const PATH_TO_TITLE: any = {
    "manpower-v1": "Vertical 1 - Manpower",
    "manpower-v2": "Vertical 2 - Manpower",
    "manpower-v3": "Vertical 3 - Manpower",
    "manpower-v4": "Vertical 4 - Manpower",
    "manpower-v5": "Vertical 5 - Manpower",
    "manpower-v6": "Vertical 6 - Manpower"
};

const VerticalPage = () => {
    const {title} = useParams<string>();

    return (
        <div className="p-4 w-full h-full">
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4 text-blue-500">{PATH_TO_TITLE[`${title}`]}</h2>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default VerticalPage;