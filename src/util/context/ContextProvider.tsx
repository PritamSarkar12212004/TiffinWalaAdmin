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

    // reloader Start
    const [loading, setloading] = useState(true);

    // store produtc data 
    const [productData, setProductData] = useState<any | null>(null)


    // error wrapper
    const [Uploader, setUploader] = useState<{
        status: boolean;
        message: string;
    }>({
        status: false,
        message: '',

    });

    const removeProductAfterDelete = (id: any) => {
        if (!productData) return;

        const updatedProductData = productData.filter(
            (product: any) => product._id !== id
        );

        setProductData(updatedProductData);
    };
    const [tempLocation, setTempLocation] = useState<any>(null)

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
                setAdminProductCount,
                loading,
                setloading,
                productData,
                setProductData,
                removeProductAfterDelete,
                tempLocation,
                setTempLocation
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


