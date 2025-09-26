import api from "../../../util/api/Axios"
import { userContext } from "../../../util/context/ContextProvider"

const useDeleteProduct = () => {
    const { removeProductAfterDelete } = userContext()
    const deleteProduct = ({ id, userId, loading, navigation }: any) => {
        api.post("/product/delete", {
            payload: {
                id: id,
                userId: userId
            }
        }).then(async () => {
            loading(false)
            await removeProductAfterDelete(id)
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        }).catch(async (err) => {
            loading(false)
            await removeProductAfterDelete(id)
            await navigation.navigate("Home")

        })
    }
    return {
        deleteProduct
    }
}

export default useDeleteProduct