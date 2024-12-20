import {RecoveryContextProvider} from "./PasswordRecovery.context";
import EnterEmailStep from "./modules/EnterEmailStep/EnterEmailStep";
import EnterCodeStep from "./modules/EnterCodeStep/EnterCodeStep";
import EnterPasswordStep from "./modules/EnterPasswordStep/EnterPasswordStep";

const PasswordRecovery: React.FC = () => {
    return (
        <RecoveryContextProvider>
            <EnterEmailStep/>
            <EnterCodeStep/>
            <EnterPasswordStep/>
        </RecoveryContextProvider>
    )
}

export default PasswordRecovery;