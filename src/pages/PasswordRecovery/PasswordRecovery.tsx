import {RecoveryContextProvider} from "./PasswordRecovery.context";
import RecoveryEmail from "./modules/Email/RecoveryEmail";
import RecoveryCode from "./modules/RecoveryCode/RecoveryCode";
import RecoveryPassword from "./modules/NewPassword/RecoveryPassword";

const PasswordRecovery: React.FC = () => {
    return (
        <RecoveryContextProvider>
            <RecoveryEmail/>
            <RecoveryCode/>
            <RecoveryPassword/>
        </RecoveryContextProvider>
    )
}

export default PasswordRecovery;