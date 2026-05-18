import { useNavigate, useParams } from "react-router-dom";
import { UserCoupons } from "@/components/profile/userCoupons";
import { Cart } from "@/components/profile/userCart";
import { UserStore } from "@/components/profile/userStore";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layouts/container"
import { ProfileStyle } from "@/styles/profile.style";
import { UserOrdersComponent } from "@/components/profile/userOrders";
import { useBoxMessage } from "@/hooks/useBoxMessages";
import { useSyncCart } from "@/hooks/useSyncCart";
import { PROFILE_OPTIONS } from "@/constants/profile";

export const Profile = () => {
  const redirect = useNavigate()
  const {action} = useParams()
  const goToForm = useRef<HTMLInputElement>(null)
  const {BoxMessage,addMessage} = useBoxMessage({styledType:"toast"})
  useSyncCart()
  const scrollToForm = () => {
    if (goToForm.current) {
      goToForm.current.scrollIntoView({
        behavior: 'smooth',
        block:"nearest"
      });
    }
  };

  useEffect(() => {
   
    const timeout = setTimeout(() => {
    if (action && goToForm.current) {
      goToForm.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100); 

    return () => clearTimeout(timeout);
  }, [action]);
  
  const onChangeActions = (page:string)=>{
    redirect(`/perfil/${page}`)
    scrollToForm()
  }
  return (
    <Container>
        <BoxMessage/>
        <ProfileStyle>
          <h1 style={{ color: '#4B5563' }}>Perfil</h1>
          <div className="boxes">
          {PROFILE_OPTIONS.map((item) => (
            <div className="box" key={item.label} onClick={()=>onChangeActions(item.page)}>
              <img src={item.img} alt={item.label} />
              <p>{item.label}</p>
            </div>
          ))}
        </div>
  
        </ProfileStyle>
      {action === "ordens" && <UserOrdersComponent />}
      {action ==="carrinho" && <Cart addMessage={addMessage} formRef={goToForm}/>}
      {action === "cupons" && <UserCoupons formRef={goToForm} />}
      {action === "loja"  && <UserStore formRef={goToForm}/>}
    </Container>
  );
};
 








