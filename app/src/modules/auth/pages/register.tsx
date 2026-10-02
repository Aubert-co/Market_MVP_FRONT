import {useRef} from "react";
import { useNavigate } from "react-router-dom";
import { serviceLoginOrRegister } from "@/modules/auth/services/loginOrRegister";
import { StyleCreateStore } from "@/modules/auth/styles/registerPage";
import { BoxBenefits } from "@/modules/auth/components/boxBenefits";
import { adLinkRegister, adTextRegister, benefitsRegister } from "@/modules/auth/constants/benefitsRegister";
import type { AddMessageParams } from "@/types/messages.types";
import { FormLoginOrRegister } from "../components/formLoginOrRegister";



export type TypeSubmitRegister ={
    email:string,
    password:string,
    setMessageParams:(msg:AddMessageParams)=>void,
    name:string

}
export const Register = ()=>{
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate()
    
    const submitForm = async({name,password,email,setMessageParams}:TypeSubmitRegister):Promise<void>=>{
        
        const {status} = await serviceLoginOrRegister({name,password,email,typeForm:'register'})
    
        if(status === 201){
            setTimeout(()=>{
                navigate('/login');
            },3000)
            return setMessageParams({content:"Você criou sua conta com sucesso, você será redirecionado",type:'success'})
        }
        if(status === 422){
            return setMessageParams({content:'Nome, email ou senha inválidos.',type:'info'});
        }
       
        if(status === 409){
            return setMessageParams({
                content: 'Confira seus dados e tente novamente. Caso já tenha uma conta, faça login.',
                type: 'info'
            });

        }
        setMessageParams({content:'Ocorreu um erro inesperado.',type:'error'});
    }
    return (
        <StyleCreateStore>
            <BoxBenefits benefits={benefitsRegister} adText={adTextRegister} adLink={adLinkRegister} formRef={formRef}/>
            <FormLoginOrRegister type={"Register"} submitEvent={submitForm} formRef={formRef}></FormLoginOrRegister>
        </StyleCreateStore>
   )
}