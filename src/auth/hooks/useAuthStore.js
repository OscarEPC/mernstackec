import { useDispatch, useSelector } from "react-redux";

import { mernStackEcApi } from "../../api";
import { 
    checking, 
    clearErrorMessage, 
    onLogin, 
    onLogout,
} from "../../store/slices/auth/authSlice";
import { onLogoutPersons } from "../../store/slices/persons/personsSlice";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(checking());
        try {
            const { data } = await mernStackEcApi.post('/auth/login', {
                email,
                password
            });
            dispatch(onLogin({...data.user}));
        } catch (error) {
            // console.log('error', error)
            dispatch(onLogout('Credenciales incorrectas.'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startLogout = () => {
        dispatch(onLogoutPersons());
        dispatch(onLogout())
    }
    
    return {
        errorMessage,
        user, 
        status, 
        startLogin,
        startLogout,
    }
}
