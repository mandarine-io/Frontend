import { useState } from 'react';

const useAlert = () => {
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [alertHeader, setAlertHeader] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const showAlert = (header: string, message: string) => {
        setAlertHeader(header);
        setAlertMessage(message);
        setIsOpenAlert(true);
    };

    const closeAlert = () => {
        setIsOpenAlert(false);
    };

    return {
        isOpenAlert,
        alertHeader,
        alertMessage,
        showAlert,
        closeAlert
    };
};

export default useAlert;
