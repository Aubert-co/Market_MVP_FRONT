import { CloseButton, PanelHeader } from "@/styles/shared.style";
import { useCallback, useEffect, useState, type ReactNode } from "react";;
import styled from "styled-components";

type OverlayProps ={
  $location?: 'center' | 'bottom'
}
const Overlay = styled.div<OverlayProps>`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: flex-end;
  justify-content: center;

  z-index: ${({ $location }) =>
    $location === "bottom" ? "9999" : "1300"};

  backdrop-filter: blur(4px);
`;

const Container = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideDown 0.25s ease-out;
  
  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const Content = styled.div`
  padding: 24px;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
`;




type ModalProps = {
  title: string;
  children: ReactNode;
};

type Props = {
  modalLocation?:'center' | 'bottom'
  cbClose?:()=>void;
  cbOpen?:()=>void
}
export function useModal({modalLocation,cbClose,cbOpen}:Props) {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        cbClose?.()
    }, []);
    const openModal = useCallback(()=>{
        setIsOpen(true);
        cbOpen?.()
    },[])
    const Modal = ({  title, children }: ModalProps) =>{
    useEffect(() => {
        function handleEsc(event: KeyboardEvent) {
        if (event.key === "Escape") closeModal();
        }

        if (isOpen) {
        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
        }

        return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "auto";
        };
    }, []);

    if (!isOpen) return null;

    return (
       <Overlay
          onClick={closeModal}
          role="presentation"
          $location={modalLocation}
        >
          <Container
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <PanelHeader>
              <h2 id="modal-title">{title}</h2>

              <CloseButton
                onClick={closeModal}
                aria-label="Fechar modal"
              >
                &times;
              </CloseButton>
            </PanelHeader>

            <Content>{children}</Content>
          </Container>
        </Overlay>
    );
    }
  return {
  
    Modal,
    closeModal,
    openModal
  };
}