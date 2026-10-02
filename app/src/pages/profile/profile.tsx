import { useNavigate, useParams } from "react-router-dom";
import { UserCoupons } from "@/modules/coupons/user/components/userCoupons";

import { UserStore } from "@/modules/store/user/components/userStore";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layouts/container"
import { ProfileStyle,ProfileBox } from "@/styles/profile.style";
import { UserOrdersComponent } from "@/modules/orders/user/components/userOrders";

import { useSyncCart } from "@/modules/cart/hooks/useSyncCart";
import { PROFILE_OPTIONS } from "@/constants/profile";
import { Cart } from "@/modules/cart/components/userCart";


export const Profile = () => {
  const redirect = useNavigate()
  const {action} = useParams()
  const goToForm = useRef<HTMLInputElement>(null)
  
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
        
        <ProfileStyle>
          <h1 style={{ color: '#4B5563' }}>Perfil</h1>
          <div className="boxes">
          {PROFILE_OPTIONS.map((item) => (
            <ProfileBox
              key={item.label}
              isActive={action === item.page}
              onClick={() => onChangeActions(item.page)}
            >
              <img src={item.img} alt={item.label} />
              <p>{item.label}</p>
            </ProfileBox>
          ))}
        </div>
  
        </ProfileStyle>
      {action === "ordens" && <UserOrdersComponent />}
      {action ==="carrinho" && <Cart  formRef={goToForm}/>}
      {action === "cupons" && <UserCoupons formRef={goToForm} />}
      {action === "loja"  && <UserStore formRef={goToForm}/>}
    </Container>
  );
};
 








