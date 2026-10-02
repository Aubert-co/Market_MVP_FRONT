import { Navigate, Outlet } from "react-router-dom"
import { useGetStoreInfo } from "@/modules/store/user/hooks/useGetStoreInfo"
import { saveStorageStore } from "@/modules/store/user/storage/store.storage"

export const ProtectedStoreRoutes = () => {

  const { storeInfo } = useGetStoreInfo()

  if (storeInfo.status === 0) {
    return <div>Carregando...</div>
  }

  if (storeInfo.status !==200) {
    return <Navigate to="/login" replace />
  }

  if (storeInfo.datas.length === 0) {
    return <Navigate to="/abrir-loja" replace />
  }
  saveStorageStore(storeInfo.datas[0]);

  return <Outlet />
}