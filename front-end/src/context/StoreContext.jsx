import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const url = "https://questionhub-backend-wyxi.onrender.com"; // Backend URL

    return (
        <StoreContext.Provider value={{ url }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
