import api from "../../../util/api/Axios"
import { userContext } from "../../../util/context/ContextProvider"

const useDeleteProduct = () => {
    const { removeProductAfterDelete } = userContext()
    const deleteProduct = ({ id, loading, navigation }: any) => {
        api.post("/product/delete", {
            payload: {
                id: id
            }
        }).then(async () => {
            loading(false)
            await removeProductAfterDelete(id)
            await navigation.goBack()
        }).catch(async (err) => {
            loading(false)
            await removeProductAfterDelete(id)
            await navigation.goBack()

        })
    }
    return {
        deleteProduct
    }
}

export default useDeleteProduct