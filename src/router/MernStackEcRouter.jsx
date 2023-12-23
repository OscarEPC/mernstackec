import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth";
import { useAuthStore } from "../auth/hooks";
import { PersonsPage } from "../admin/pages";

export const MernStackEcRouter = () => {
    const { status, user, checkAuthToken } = useAuthStore();

    // if (status === 'checking') {
    //     return (
    //         <h3>Cargando...</h3>
    //     )
    // }

    return (
        <Routes>
            {status === 'authenticated' ? (
                <>
                    <Route path="persons" element={<PersonsPage />} />
                    <Route path="/*" element={<Navigate to="persons" />} />
                </>
            ) : (
                <>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="login" />} />
                </>
            )}
        </Routes>
    )
}
