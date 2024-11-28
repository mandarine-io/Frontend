import {useState} from 'react';
import {createContainer} from 'react-tracked';
import {RegistrationState} from "./RegisterContext.types";

const useRegistrationState = () => {
    const [state, setState] = useState<RegistrationState>({
        email: '',
    });

    return [state, setState] as const;
};

const {
    Provider: RegistrationContextProvider,
    useTracked: useRegistrationContext
} = createContainer(useRegistrationState);

export {RegistrationContextProvider, useRegistrationContext};