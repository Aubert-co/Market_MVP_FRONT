import { adLinkStore,adTextStore,benefitsCreateStore } from "@/modules/auth/constants/benefitsRegister";
import { StyleCreateStore } from "@/modules/auth/styles/registerPage";
import type { PropsFormCreateStore } from "@/modules/store/user/types/store.types";
import { BoxBenefits } from "@/modules/auth/components/boxBenefits";
import { FormCreateStore } from "./formCreateStore";


export const BoxCreateStore = ({formRef}:PropsFormCreateStore)=>{
    return (
        <StyleCreateStore>
            <BoxBenefits
                formRef={formRef}
                adText={adTextStore}
                adLink={adLinkStore}
                benefits={benefitsCreateStore}
                />
            <FormCreateStore formRef={formRef}/>
        </StyleCreateStore>
    )
}
