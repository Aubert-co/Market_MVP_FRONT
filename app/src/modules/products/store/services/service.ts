import { serviceCreateProduct, type CreateProduct } from "./createProduct.service";
import { serviceUpdateProduct, type UpdateProduct } from "./updateProduct.service";


type Props =
  | {
      type: "create";
      payload: CreateProduct;
    }
  | {
      type: "update";
      payload: UpdateProduct;
    };

export const upsertProduct = async({type,payload}:Props):Promise<number>=>{
    if(type === "create"){
        const {status}  = await serviceCreateProduct(payload)
        return status
    }
    const {status} = await serviceUpdateProduct(payload)
    return status
}


