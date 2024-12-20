import { useEffect, useState } from 'react'
import { createContainer } from 'react-tracked'
import {RecoveryState} from "./PasswordRecovery.context.types";

const useRecoveryState = () => {
    const [recoveryState, setRecoveryState] = useState<RecoveryState | undefined>(undefined);

    useEffect(() => {
        const fetchInitialState = async () => {
            setRecoveryState({
                step: 1
            });
        };
        fetchInitialState();
    }, []);

    return [recoveryState, setRecoveryState] as const;
};

const container = createContainer(useRecoveryState)

const RecoveryContextProvider = container.Provider

const useRecoveryContext = (): {
    state?: RecoveryState;
    updateState: (input: RecoveryState) => void ;
} => {
    const [state, setState] = container.useTracked()

    const updateState = (input: RecoveryState) => {
            setState(prevState => {
                const newState: RecoveryState = {
                    step: input.step,
                    email: input?.email || prevState?.email,
                    code: input?.code || prevState?.code,
                    password: input?.password || prevState?.password,
                };

                return newState;
            });
    };

    return {state: state, updateState: updateState}
}

export { RecoveryContextProvider, useRecoveryContext }