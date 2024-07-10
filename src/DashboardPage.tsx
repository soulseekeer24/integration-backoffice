import React from "react";
import {Link, Outlet} from "react-router-dom";
import useAuth from "./auth/context/AuthContext.tsx";
import {DashboardLayout} from "./shared_kernel/ui/layouts";

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar py-4 px-2 bg-blue-900 text-white">
            <ul>
                <li className="mb-2">
                    <Link to="/manpower-v3" className="text-blue-200 hover:text-white">
                        Vertical 3 Manpower
                    </Link>
                </li>
            </ul>
        </div>
    );
}

const Header: React.FC = () => {
    const {logout} = useAuth();
    const handleClickLogout = async () => {
        await logout();
    }

    return (
        <div className="header py-4 px-2 flex justify-between items-center bg-blue-500 text-white">
            <div className="flex items-center">
                <img src="https://via.placeholder.com/40" alt="Foto de perfil" className="w-10 h-10 rounded-full mr-2"/>
                <h1 className="text-2xl font-bold">Integraciones</h1>
            </div>
            <button onClick={handleClickLogout} className="bg-white text-blue-500 font-bold py-2 px-4 rounded shadow">
                Cerrar sesión
            </button>
        </div>
    );
}


const Dashboard: React.FC = () => {
    return (
        <DashboardLayout
            header={<Header/>}
            sidebar={<Sidebar/>}
        >
            <Outlet/>
        </DashboardLayout>
    );
};

export default Dashboard;
