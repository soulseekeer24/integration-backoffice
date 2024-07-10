import {Outlet} from "react-router-dom";

const Vertical3Page = () => {
    return (
        <div className="p-4">
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4 text-blue-500">Vertical 3</h2>

                <div>
                    <div className="flex justify-end mb-4 mt-4">

                    </div>
                </div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Vertical3Page;