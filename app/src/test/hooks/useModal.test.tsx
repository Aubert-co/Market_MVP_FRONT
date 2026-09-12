import {  render, screen, fireEvent } from '@testing-library/react'
import { useModal } from '@/hooks/useModal'

describe('useModal', () => {
    const text = "lorem iptsu"
    const TestComponente = ()=>{
        const {closeModal,openModal,Modal} = useModal({modalLocation:'center'})

        return (
            <>
                <button onClick={openModal}>open modal</button>
                <button onClick={closeModal}>close modal</button>
                <Modal title='testing'>
                    {text}
                </Modal>
            </>
        )
    }
    it('should render the modal closed initially', () => {
        render(
            <TestComponente/>
        )

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
    it('should open and close the modal with the close button', () => {
       
        render(
            <TestComponente/>
        )
        fireEvent.click(screen.getByText('open modal'))
        expect(screen.queryByRole('presentation')).toBeInTheDocument()
        expect(screen.getByText(text)).toBeInTheDocument()

        fireEvent.click(screen.getByText('close modal'))

        expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
        expect(screen.queryByText(text)).not.toBeInTheDocument()
    })
    it('should open and close the modal using the external close button', () => {
       
        render(
            <TestComponente/>
        )
        fireEvent.click(screen.getByText('open modal'))
        expect(screen.queryByRole('presentation')).toBeInTheDocument()
        expect(screen.getByText(text)).toBeInTheDocument()

        fireEvent.click(screen.getByText('close modal'))

        expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
        expect(screen.queryByText(text)).not.toBeInTheDocument()
    }) 
    it('should close the modal with the X button', () => {
       
        render(
            <TestComponente/>
        )
        fireEvent.click(screen.getByText('open modal'))
        expect(screen.queryByRole('presentation')).toBeInTheDocument()
        expect(screen.getByText(text)).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button',{
            name:'Fechar modal'
        }))

        expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
        expect(screen.queryByText(text)).not.toBeInTheDocument()
    }) 
    it('should close the modal when clicking the overlay', () => {
       
        render(
            <TestComponente/>
        )
        fireEvent.click(screen.getByText('open modal'))
        expect(screen.queryByRole('presentation')).toBeInTheDocument()
        expect(screen.getByText(text)).toBeInTheDocument()

        fireEvent.click(screen.getByRole('presentation'))

        expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
        expect(screen.queryByText(text)).not.toBeInTheDocument()
    }) 
})


describe('useModal with callbacks', () => {
    const text = "lorem iptsu"
    const cbClose = jest.fn()
    const cbOpen = jest.fn()
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    const TestComponente = ()=>{
        const {closeModal,openModal,Modal} = useModal({modalLocation:'center',cbClose,cbOpen})

        return (
            <>
                <button onClick={openModal}>open modal</button>
                <button onClick={closeModal}>close modal</button>
                <Modal title='testing'>
                    {text}
                </Modal>
            </>
        )
    }

    it('should call the open and close callbacks when using the modal buttons',()=>{
          render(
            <TestComponente/>
        )
        fireEvent.click(screen.getByText('open modal'))
        expect(cbOpen).toHaveBeenCalledTimes(1)
        expect(screen.queryByRole('presentation')).toBeInTheDocument()
        expect(screen.getByText(text)).toBeInTheDocument()

        fireEvent.click(screen.getByText('close modal'))
        expect(cbClose).toHaveBeenCalledTimes(1)
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
        expect(screen.queryByText(text)).not.toBeInTheDocument()
    })
    it('should call the close callback when clicking the X button', () => {
       
        render(
            <TestComponente/>
        )
        fireEvent.click(screen.getByText('open modal'))
        expect(cbOpen).toHaveBeenCalledTimes(1)
        expect(screen.queryByRole('presentation')).toBeInTheDocument()
        expect(screen.getByText(text)).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button',{
            name:'Fechar modal'
        }))
        expect(cbClose).toHaveBeenCalledTimes(1)
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
        expect(screen.queryByText(text)).not.toBeInTheDocument()
    }) 
    it('should call the close callback when clicking the overlay', () => {
       
        render(
            <TestComponente/>
        )
        fireEvent.click(screen.getByText('open modal'))
        expect(cbOpen).toHaveBeenCalledTimes(1)
        expect(screen.queryByRole('presentation')).toBeInTheDocument()
        expect(screen.getByText(text)).toBeInTheDocument()

        fireEvent.click(screen.getByRole('presentation'))
        expect(cbClose).toHaveBeenCalledTimes(1)
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
        expect(screen.queryByText(text)).not.toBeInTheDocument()
    }) 
})