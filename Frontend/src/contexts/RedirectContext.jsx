import React, { createContext, useContext, useState } from "react";

const RedirectContext = createContext();
export const RedirectProvider = ({ children }) => {
    const [redirectPath, setRedirectPath] = useState(null);
    return (
        <RedirectContext.Provider value={{ redirectPath, setRedirectPath }}>
            {children}
        </RedirectContext.Provider>
    );
};

export const useRedirect = () => {
    const context = useContext(RedirectContext);
    if (!context) {
        throw new Error("useRedirect must be used within a RedirectProvider");
    }
    return context;
};
