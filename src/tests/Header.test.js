import Header from "../components/Header"
import { renderWithRouterAndRedux } from "./helpers/renderWith"
import { screen } from '@testing-library/dom'
import React from 'react'
import WalletForm from "../components/WalletForm"


describe('teste componente Header',() =>{
    it('teste campo de despesas', () => {
        renderWithRouterAndRedux(<Header />)
        expect(screen.getByText(/brl/i)).toBeInTheDocument()
        expect(screen.getByTestId('total-field')).toBeInTheDocument()
        expect(screen.getByTestId('header-currency-field')).toBeInTheDocument()
    })

    it('soma total',()=>{
        renderWithRouterAndRedux(<Header />)
        expect(screen.getByText(/0.00/i)).toBeInTheDocument()
    })
    
})