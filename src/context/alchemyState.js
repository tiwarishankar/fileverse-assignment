import { createContext, useContext, useState } from "react";

const AlchemyStateContext = createContext();

export const ContextProvider = ({children}) =>{
    const [alchemy, setAlchemy] = useState("");
    const [account, setAccount] = useState("");
    const [isSet, setIsSet] = useState(false);
    // const [isLoading, setLoading] = useState(false)
    return <AlchemyStateContext.Provider value={{
        alchemy, setAlchemy, account, setAccount,isSet, setIsSet,
    }}>
        {children}
    </AlchemyStateContext.Provider>
}

export const useAlchemyState = () => useContext(AlchemyStateContext);