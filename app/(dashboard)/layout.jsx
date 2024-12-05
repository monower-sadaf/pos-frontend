import Sidebar from "../_component/Sidebar/Sidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="grow">
                {children}
            </div>
        </div>
    );
};

export default Layout;