import {useState} from 'react';
import {createContainer} from 'react-tracked';
import {RegistrationState} from "./RegisterContext.types";

const useRegistrationState = () => {
    const [state, setState] = useState<RegistrationState>({
        email: undefined,
    });

    return [state, setState] as const;
};

const { Provider: RegistrationContextProvider, useTracked } = createContainer(useRegistrationState);

const useRegistrationContext = () => {
    const [registrationState, setRegistrationState] = useTracked();
    return { registrationState, setRegistrationState };
};

export { RegistrationContextProvider, useRegistrationContext };