import { useAuthStore } from "../../auth/hooks"

export const Navbar = () => {
    const { startLogout } = useAuthStore();
    
    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <button type="submit" className="btn btn-primary btn-block" onClick={startLogout}>
                    Salir
                </button>
            </div>
        </nav>
    )
}
