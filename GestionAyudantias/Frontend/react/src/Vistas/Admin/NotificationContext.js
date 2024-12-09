// NotificationContext.js
import { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'info', options = {}) => {
        toast[type](message, options);
    };

    return (
        <>
            <NotificationContext.Provider value={{ showNotification }}>
                {children}
            </NotificationContext.Provider>
            <ToastContainer />
        </>
    );
};
