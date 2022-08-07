import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import React from 'react'
import App from '../App'
import {  renderWithRouterAndRedux } from "./helpers/renderWith"

describe('Desenvolva testes para atingir 60% de cobertura total da aplicação',() =>{
    it('tela de login tem campos de email e senha?',()=>{
        renderWithRouterAndRedux(<App />)
        expect(screen.getByPlaceholderText(/E-mail/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Senha/)).toBeInTheDocument();

        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const button = screen.getByRole('button', { name: /entrar/i, })

        expect(passwordInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })
    
    it('testar componente Login', ()=>{
       const { history} = renderWithRouterAndRedux(<App />)
       
       const email = screen.getByTestId('email-input');
       const password = screen.getByTestId('password-input');
        const button = screen.getByRole('button', { name: /entrar/i, })

        expect(button).toBeDisabled()

  
        userEvent.type(email, 'gelso0@email.com')
        userEvent.type(password, '123456')        
        userEvent.click(button);
        expect(button).not.toBeDisabled()
        const { location: { pathname }} = history;
        expect(pathname).toBe('/carteira')
    })
})