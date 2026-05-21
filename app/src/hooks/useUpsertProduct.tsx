import { useBoxMessage } from "./useBoxMessages"
import { getMultiInputValues } from "@/utils"
import { checkIsAValidCategory, isAValidString ,checkIsAValidNumber,getValidImageFile, buildUpdatePayload, hasChanges} from "@/utils/checkIsValid"

import type { OpenSideBarOuDrawer } from "@/types/storeDashboard.types"
import type { UpsertProducts } from "@/types/storeDashboard.types"
import { serviceCreateProduct, serviceUpdateProduct } from "@/services/store/productAdmin"
import { renderMessage } from "@/utils/returnMessages"


export type UpsertProductsRefs = {
  nameRef: React.RefObject<HTMLInputElement | null>
  descriptionRef: React.RefObject<HTMLTextAreaElement | null>
  imageRef: React.RefObject<HTMLInputElement | null>
  priceRef: React.RefObject<HTMLInputElement | null>
  stockRef: React.RefObject<HTMLInputElement | null>
  categoryRef: React.RefObject<HTMLSelectElement | null>
  image?:string
}


export type UseUpsetProduct = {
  BoxMessage: () => React.ReactElement
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}
type Props = {
  type:"create" | "update",
  valuesRef:UpsertProductsRefs,
  closeModal:(prop:OpenSideBarOuDrawer)=>void,
  originalValues:UpsertProducts
}


export const  useUpsertProduct = ({type,valuesRef,closeModal,originalValues}:Props): UseUpsetProduct => {

  const {nameRef,descriptionRef,priceRef,stockRef,categoryRef,imageRef} = valuesRef
 
  const { addMessage, BoxMessage } = useBoxMessage({ styledType: "" })


  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
     const [name,description,price,stock,category] = getMultiInputValues(nameRef,descriptionRef,priceRef,stockRef,categoryRef)
    if (!isAValidString(name)) {
      addMessage({ content: "Digite um nome válido", type: "info" })
      return
    }
    
    if (!isAValidString(description, 199)) {
      addMessage({ content: "Digite uma descrição válida", type: "info" })
      return
    }

    if (!checkIsAValidNumber(price)) {
      addMessage({ content: "Digite um preço válido", type: "info" })
      return
    }

    if (!checkIsAValidNumber(stock)) {
      addMessage({ content: "Digite um estoque válido", type: "info" })
      return
    }

    if (!checkIsAValidCategory(category)) {
      addMessage({ content: "Selecione uma categoria", type: "info" })
      return
    }

    const file = getValidImageFile(imageRef)

    if(type === "update"){
      const originalFields = {
        name:originalValues.name,
        category:originalValues.category,
        price:originalValues.price,
        stock:originalValues.stock,
        description:originalValues.description
      }
      if(!hasChanges(originalFields,{name,description,category,stock,price}) && !file){
     
        addMessage({content:"Campos não foram alterados",type:'info'})
        return;
      }
      const payload = buildUpdatePayload({
        originalFields,
        newFields:{
          name,description,category,stock,price
        }
      })
    
      const {status} = await serviceUpdateProduct({...payload,id:originalValues.id,image:file})
      const {content,type:typeMessage} = renderMessage({action:'update',status})

      addMessage({content,type:typeMessage})
      if(status === 201)closeModal(null)
      return;
    }
    if (!file ) {
      addMessage({ content: "Adicione uma imagem", type: "info" })
      return
    } 

   
      const {status} = await serviceCreateProduct({
        name,
        image: file,
        description,
        category,
        stock,
        price
      })
      const { content,type:typeMessage} = renderMessage({action:"create",status})
      addMessage({content,type:typeMessage})
      if(status === 201){
        closeModal(null)
      }
    }

    
  return {
    BoxMessage,
    submit,
  }
}

