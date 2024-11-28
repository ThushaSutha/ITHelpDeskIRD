import { createContext } from "react";
import React from "react";
import PropTypes from "prop-types";


export const userContext = createContext();

export const ContextProvider = ({ children }) => {
    const role = 'admin';
    const authenticated = true;

    return(
        <userContext.Provider value={{ role, authenticated }}>
            {children}
        </userContext.Provider>
    );
}

ContextProvider.propTypes ={
    children: PropTypes.node.isRequired
};

export default ContextProvider;