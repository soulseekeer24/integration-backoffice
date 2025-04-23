import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './auth/context/AuthContext.tsx';
import ProtectedRoute from './auth/guards/ProtectedRoute.tsx';
import Dashboard from './DashboardPage.tsx';
import LoginPage from './auth/pages/LoginPage.tsx';
import VerticalPage from "./integrations/pages/VerticalPage.tsx";
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
                                path="/manpower/:title"
                                element={<VerticalPage />}
                            >
                                <Route
                                    path="/manpower/:title/listing"
                                    element={<ListingIntegrationPage/>}/>
                                <Route
                                    path="/manpower/:title/form"
                                    element={<CreateIIntegrationPage/>}
                                />
                                <Route
                                    path="/manpower/:title/form/:id"
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
