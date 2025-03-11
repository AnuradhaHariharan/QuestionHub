import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const url = "http://localhost:4000"; // Backend URL

    return (
        <StoreContext.Provider value={{ url }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
