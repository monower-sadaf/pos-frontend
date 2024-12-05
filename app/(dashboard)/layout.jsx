

// import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "../_component/Sidebar/Sidebar";

const Layout = ({ children }) => {
    return (
        // <AuthProvider>
            <div className="flex">
                <Sidebar />
                <div className="grow">
                    {children}
                </div>
            </div>
        // </AuthProvider>

    );
};

export default Layout;