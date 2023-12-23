import { useForm } from "../../ui/hooks";

import { useEffect } from "react";
import Swal from "sweetalert2";

import '../../theme/login.css';
import { useAuthStore } from "../hooks";

export const LoginPage = () => {
    const { startLogin, errorMessage, startLogout } = useAuthStore();
    const { email, password, handleInputValueChange } = useForm({
        email: '',
        password: ''
    });
    
    const login = (e) => {
        e.preventDefault();
        startLogin({ email, password });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación.', errorMessage, 'error');
        }
    }, [errorMessage])
    
    
    return (
        <div className="content p-3 rounded-1 mx-auto">
            <form onSubmit={login}>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={handleInputValueChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={handleInputValueChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
};
