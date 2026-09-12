import '@testing-library/jest-dom';
import {  fireEvent, render } from "@testing-library/react";
import { FormLoginOrRegister } from "@/components/forms/formLoginOrRegister";
import React from "react";
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"


describe("FormLoginOrRegister ",()=>{
    const mockSubmitEvent = jest.fn();
    const name = "lucas"
    const email = "lucas@gmail.com"
    const password = "1234567"
    const mockFormRef: React.RefObject<HTMLFormElement | null> = {
          current: {
            value: '',
            focus: jest.fn(),
          } as unknown as HTMLFormElement,
        };
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should display the correct inputs for the 'Register' form type",()=>{
        const {queryByPlaceholderText,getByText}= render(
          
            <Router>
            <Routes>
                <Route
                path="/"
                element={
                    <FormLoginOrRegister
                    formRef={mockFormRef}
                    type="Register"
                    submitEvent={mockSubmitEvent}
                    />
                }
                />
            </Routes>
            </Router>
     
        )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com")
        const byPassword = queryByPlaceholderText("Digite uma senha forte!")
        const byName = queryByPlaceholderText("Ex: joao")
        const byRepPassword = queryByPlaceholderText("Igual a do campo senha")
        const checkBox = getByText("Li e aceito os")
        expect(byEmail).toBeInTheDocument()
        expect(byPassword).toBeInTheDocument()
        expect(byName).toBeInTheDocument()
        expect(byRepPassword).toBeInTheDocument()
        expect(getByText("Cadastro")).toBeInTheDocument()
        expect(checkBox).toBeInTheDocument()
    })
     it("should call the submit function when the 'Register' form is fully completed",()=>{
        const {queryByPlaceholderText,getByText,getByRole}= render(
        
            <Router>
            <Routes>
                <Route
                path="/"
                element={
                    <FormLoginOrRegister
                    formRef={mockFormRef}
                    type="Register"
                    submitEvent={mockSubmitEvent}
                    />
                }
                />
            </Routes>
            </Router>
   
        )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLElement
        const byRepPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLElement
        const btnSubmit = getByText("Enviar")
        const linkToPageLogin = getByText("Já tem uma conta faça login!")
        const checkbox = getByRole("checkbox")
        expect(linkToPageLogin).toBeInTheDocument()
        
        expect(getByText("Cadastro")).toBeInTheDocument()
        
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        fireEvent.change(byRepPassword,{target:{value:password}})
        fireEvent.change(byName,{target:{value:name}})
        fireEvent.click(checkbox)
        fireEvent.click(btnSubmit)
        
        expect(mockSubmitEvent).toHaveBeenCalledTimes(1)
        expect(mockSubmitEvent).toHaveBeenCalledWith({name,password,email, setMessageParams: expect.any(Function)})
    })
     it("should not call the submit function when registering without accepting the terms",()=>{
        const {queryByPlaceholderText,getByText}= render(
        
            <Router>
            <Routes>
                <Route
                path="/"
                element={
                    <FormLoginOrRegister
                    formRef={mockFormRef}
                    type="Register"
                    submitEvent={mockSubmitEvent}
                    />
                }
                />
            </Routes>
            </Router>
   
        )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLElement
        const byRepPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLElement
        const btnSubmit = getByText("Enviar")
        const linkToPageLogin = getByText("Já tem uma conta faça login!")
    
        expect(linkToPageLogin).toBeInTheDocument()
        
        expect(getByText("Cadastro")).toBeInTheDocument()
        
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})
        fireEvent.change(byRepPassword,{target:{value:password}})
        fireEvent.change(byName,{target:{value:name}})
        
        fireEvent.click(btnSubmit)
        
        expect(mockSubmitEvent).toHaveBeenCalledTimes(0)
        
    })
    it("should call the submit function when all inputs are filled and the form type is 'Login'",()=>{
        const {queryByPlaceholderText,queryByText,getByText}= render(
      
            <Router>
            <Routes>
                <Route
                path="/"
                element={
                    <FormLoginOrRegister
                    formRef={mockFormRef}
                    type="Login"
                    submitEvent={mockSubmitEvent}
                    />
                }
                />
            </Routes>
            </Router>

        )
        const byEmail = queryByPlaceholderText("Ex: joao@gmail.com") as HTMLElement
        const byPassword = queryByPlaceholderText("Digite uma senha forte!") as HTMLElement
        const byName = queryByPlaceholderText("Ex: joao") as HTMLElement
        const byRepPassword = queryByPlaceholderText("Igual a do campo senha") as HTMLElement
        const btnSubmit = getByText("Enviar")
        const linkToPageLogin = getByText("Não tem uma conta crie uma agora!")
        const checkBox = queryByText("Li e aceito os")

        expect(linkToPageLogin).toBeInTheDocument()
        expect(byName).toBeNull()
        expect(byRepPassword).toBeNull()
        expect(getByText("Login")).toBeInTheDocument()
        expect(checkBox).not.toBeInTheDocument()
        fireEvent.change(byEmail,{target:{value:email}})
        fireEvent.change(byPassword,{target:{value:password}})


        fireEvent.click(btnSubmit)
        
        expect(mockSubmitEvent).toHaveBeenCalledTimes(1)
        expect(mockSubmitEvent).toHaveBeenCalledWith(
        expect.objectContaining({
            name:"",
            password,
            email,
            setMessageParams: expect.any(Function),
        })
        );
    })
})