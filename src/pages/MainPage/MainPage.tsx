import React from "react";
import Login from "../Login/Login";
import { useAuthContext } from "../../contexts/AuthContext/AuthContext";
import { Role } from "../../contexts/user/UserContext";

const MainPage: React.FC = () => {
    const { authState } = useAuthContext()

    const renderComponent = () => {
        if (authState === undefined) {
            return <Login/>
        }
        switch (authState.role) {
            case Role.MASTER:
                return <Login />
            case Role.CLIENT:
                return <Login />
        }
    };

    return (
        <div>
            {renderComponent()}
        </div>
    );
};

export default MainPage;
