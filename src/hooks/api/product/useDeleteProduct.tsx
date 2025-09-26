import { useNotify } from "../../../components/wraper/Wraper"
import api from "../../../util/api/Axios"
import { userContext } from "../../../util/context/ContextProvider"

const useDeleteProduct = () => {
    const { caller } = useNotify()
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
            caller({
                message: 'Post Deleted',
                description: 'Your mess post has been removed.',
                type: 'success',
            });
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        }).catch(async (err) => {
            loading(false)
            await removeProductAfterDelete(id)
            caller({
                message: 'Oops!',
                description: 'Could not connect to the server.',
                type: 'danger',
            });
            await navigation.navigate("Home")

        })
    }
    return {
        deleteProduct
    }
}

export default useDeleteProduct