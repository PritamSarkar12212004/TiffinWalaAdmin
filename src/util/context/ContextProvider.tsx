import { createContext, useContext, useState } from "react";
import { ContextinterFace } from "../../interface/context/ContextinterFace";


const Context = createContext<ContextinterFace | undefined>(undefined);
export const ContextProvider = ({ children }: { children: React.ReactNode }) => {

    // admin local data riciver
    const [adminLocalData, setAdminLocalData] = useState<any | null>(null)

    // admin DataBase Riciver
    const [adminDatabase, setAdminDatabase] = useState<any | null>(null)

    // admin Data Product Count
    const [adminProductCount, setAdminProductCount] = useState<any | null | boolean>(null)

    // error wrapper
    const [Uploader, setUploader] = useState<{
        status: boolean;
        message: string;
    }>({
        status: false,
        message: '',

    });

    return (
        <Context.Provider
            value={{
                Uploader,
                setUploader,
                adminLocalData,
                setAdminLocalData,
                adminDatabase,
                setAdminDatabase,
                adminProductCount,
                setAdminProductCount
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const userContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('userContext must be used within a ContextProvider');
    }
    return context;
};


