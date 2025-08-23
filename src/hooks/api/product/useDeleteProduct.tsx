import api from "../../../util/api/Axios"

const useDeleteProduct = () => {
    const deleteProduct = ({ id, loading }: any) => {
        api.post("/product/delete", {
            payload: {
                id: id
            }
        }).then(() => {
            loading(false)
        }).catch((err) => {
            console.log(err)
            loading(false)
        })
    }
    return {
        deleteProduct
    }
}

export default useDeleteProduct