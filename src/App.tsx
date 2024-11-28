import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './auth/context/AuthContext.tsx';
import ProtectedRoute from './auth/guards/ProtectedRoute.tsx';
import Dashboard from './DashboardPage.tsx';
import LoginPage from './auth/pages/LoginPage.tsx';
import Vertical3Page from "./integrations/pages/Vertical3Page.tsx";
import ListingIntegrationPage from "./integrations/pages/ListingIntegrationPage.tsx";
import CreateIIntegrationPage from './integrations/pages/CreateIIntegrationPage.tsx';
import EditIntegrationPage from "./integrations/pages/EditIntegrationPage.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }>
                            <Route
                                path="/manpower-v3"
                                element={<Vertical3Page/>}
                            >
                                <Route
                                    path="/manpower-v3/listing"
                                    element={<ListingIntegrationPage/>}/>
                                <Route
                                    path="/manpower-v3/form"
                                    element={<CreateIIntegrationPage/>}
                                />
                                <Route
                                    path="/manpower-v3/form/:id"
                                    element={<EditIntegrationPage/>}
                                />
                            </Route>
                        </Route>
                        <Route path="/login"
                               element={<ProtectedRoute secure={false}>
                                   <LoginPage/></ProtectedRoute>
                               }/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App
