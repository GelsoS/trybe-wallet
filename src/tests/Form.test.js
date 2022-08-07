import React from "react";
import { screen } from '@testing-library/dom'
import { cleanup } from "@testing-library/react/dist/pure";
import '@testing-library/jest-dom'

import { renderWithRouterAndRedux } from "./helpers/renderWith";
import WalletForm from "../components/WalletForm";
import { RuleTester } from "eslint";
import Header from "../components/Header";
import Table from "../components/Table";
import userEvent from "@testing-library/user-event";
import { getByText, waitFor } from "@testing-library/react";
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const initialState = {
  user: {
    email: 'teste@email.com',
  },
  wallet: {
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY',
     'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [{
      id: 0,
      value: '2',
      description: 'RuleTester.test.js',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      exchangeRates: {
        USD: {
          code: 'USD',
          codein: 'BRL',
          name: 'Dólar Americano/Real Brasileiro',
          ask: "5.2284",
        }
      }
    }],
  }
};

describe('Conjunto de testes do TrybeWallet', () => {
  // beforeEach(cleanup)
  it('Deveria renderizar componenetes do path /carteira',  () => {
    renderWithRouterAndRedux(<WalletForm />);
    const valor = screen.getByText(/valor:/i);
    const about =  screen.getByText(/Descricao:/i);
    const currenciesSelect =  screen.getByTestId('currency-input');
    const methodesSelect =  screen.getByTestId('method-input');
    const tagsSelect =  screen.getByTestId('tag-input');
    const Button =  screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valor).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(currenciesSelect).toBeInTheDocument();
    expect(methodesSelect).toBeInTheDocument();
    expect(tagsSelect).toBeInTheDocument();
    expect(Button).toBeInTheDocument();
  });

  it('teste componente Header', ()=>{
     renderWithRouterAndRedux(<Header/>, { initialState })
     expect(screen.getByText(/10.46/i)).toBeInTheDocument()
     expect(screen.getByText(/brl/i)).toBeInTheDocument()
     expect(screen.getByTestId('total-field')).toBeInTheDocument()
     expect(screen.getByTestId('header-currency-field')).toBeInTheDocument()
   })
}); 

describe('componente Table ',() =>{
  //refer: https://polvara.me/posts/five-things-you-didnt-know-about-testing-library
  it('aparece os textos?',() => {
    renderWithRouterAndRedux(<Table />)
    const valor = screen.getByText('Valor').closest('th')
    const descricao =  screen.getByText('Descrição').closest('th');
    const currencies =  screen.getByText('Moeda').closest('th');
    const method =  screen.getByText('Método de pagamento').closest('th');
    const tag =  screen.getByText('Tag').closest('th');
    const convertido =  screen.getByText('Valor convertido').closest('th');
    const MoedaConversao =  screen.getByText('Moeda de conversão').closest('th');
    const editarExcluir =  screen.getByText('Editar/Excluir').closest('th');
    const cambio =  screen.getByText('Câmbio utilizado').closest('th');
    
    expect(descricao).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(currencies).toBeInTheDocument();
    expect(cambio).toBeInTheDocument();
    expect(convertido).toBeInTheDocument();
    expect(MoedaConversao).toBeInTheDocument();
    expect(editarExcluir).toBeInTheDocument();
  })

  it('lista a despesa?', ()=>{
    renderWithRouterAndRedux(<Table />, { initialState })
    const descricao =  screen.getByText('RuleTester.test.js').closest('td');
    const tag =  screen.getByText('Alimentacao').closest('td');
    const method =  screen.getByText('Dinheiro').closest('td');
    const valor = screen.getByText('2.00').closest('td')
    const currencies =  screen.getByText('Dólar Americano/Real Brasileiro').closest('td');
    const cambio =  screen.getByText('5.23').closest('td');
    const convertido =  screen.getByText('10.46').closest('td');
    const MoedaConversao =  screen.getByText('BRL').closest('td');
    const editar =  screen.getByRole('button', { name: 'Editar'});
    const excluir =  screen.getByRole('button', { name: 'Excluir'});

    expect(descricao).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(currencies).toBeInTheDocument();
    expect(cambio).toBeInTheDocument();
    expect(convertido).toBeInTheDocument();
    expect(MoedaConversao).toBeInTheDocument();
    expect(editar).toBeInTheDocument();
    expect(excluir).toBeInTheDocument();
  })
 
  // it.only('adicionar despesa', async () => {
  //   renderWithRouterAndRedux(<WalletForm />);

  //   const valueInput = screen.getByTestId('value-input');
  //   const descriptionInput = screen.getByTestId('description-input');
  //   const addExpenseBtn = screen.getByRole('button', {
  //     name: /adicionar despesa/i,
  //   });

  //   userEvent.type(valueInput, '10');
  //   userEvent.type(descriptionInput, 'teste');
  //   userEvent.click(addExpenseBtn);
  //   renderWithRouterAndRedux(<Table />);


  //   expect(
  //    (await screen.findByText('10.00')).closest('td')
  //   ).toBeInTheDocument();

  //   expect(
  //     await screen.findByRole('cell', {
  //       name: 'Dólar Americano/Real Brasileiro',
  //     })
  //   ).toBeInTheDocument();

  //   expect(
  //     await screen.findByRole('cell', { name: 'Dinheiro' })
  //   ).toBeInTheDocument();

  //   expect(
  //     await screen.findByRole('cell', { name: 'Alimentação' })
  //   ).toBeInTheDocument();

  //   expect(
  //     await screen.findByRole('cell', { name: 'teste' })
  //   ).toBeInTheDocument();

  //   expect(
  //     await screen.findByRole('cell', { name: 'BRL' })
  //   ).toBeInTheDocument();
  // });

  it('Should not render the currencies if the api request fails', () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return Promise.reject('error')
    });

    renderWithRouterAndRedux(<WalletForm />);

    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput.options).toHaveLength(0);
  });
//   it('botao editar funciona?', async()=>{
//     renderWithRouterAndRedux(<Wallet />)
//     const salvar =  screen.getByRole('button', { name: 'Adicionar despesa'});
//     userEvent.click(salvar)

//     const editar =  await screen.findByRole('button', { name: 'Editar'});
//      userEvent.click(editar)

//     const inputDesc = screen.getByTestId('description-input');
//     userEvent.type(inputDesc, 'teste')
//     userEvent.click(salvar)


//     expect(screen.getByText('teste').closest('td')).toBeInTheDocument()
//   })
})

describe('teste da chamada da funcao', ()=>{

  test('Verifica se a requisição a API é feita ', () => {
    fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData)
    })

     renderWithRouterAndRedux(<Wallet />);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(
    'https://economia.awesomeapi.com.br/json/all',
    );
     });

  //    test('Verifica campos inputs', async () => {
  //   fetch = jest.fn().mockResolvedValue({
  //   json: jest.fn().mockResolvedValue(mockData)
  //   })

  //   renderWithRouterAndRedux(<Wallet />);
  //   await waitFor(() => expect(fetch).toBeCalledTimes(1));
  //   const valueInput = screen.getByTestId( "value-input" );
  //   const description = screen.getByTestId("description-input");
  //   const currency = screen.getByTestId('currency-input');
  //   const method = screen.getByTestId('method-input');
  //   const tag = screen.getByTestId('tag-input');
  //   const addButton = screen.getByRole("button", { name: /adicionar despesa/i });
  //   const trBody = screen.getAllByRole("rowgroup")[1];
  //   userEvent.type(valueInput, '20.00');
  //   userEvent.type(description, 'Lanche');
  //   userEvent.selectOptions(method, ['Dinheiro']);
  //   userEvent.selectOptions(tag, ['Alimentação']);
  //   userEvent.selectOptions(currency, ['EUR']);
  //   userEvent.click(addButton);
  //   await waitFor(() => expect(fetch).toHaveBeenCalled());
  //   expect(trBody.childNodes.length).toBe(1);
  //   expect(valueInput.value).toBe('');
  //   expect(description.value).toBe('');
  //   const total = screen.getByTestId('total-field');
  //   expect(total.innerHTML).not.toBe('0.00');
  //   expect(screen.getByText('Lanche')).toBeInTheDocument();
  //   expect(screen.getByText('20.00')).toBeInTheDocument();
  //   expect(screen.getByText('EUR')).toBeInTheDocument();
  //   const editButton = screen.getByRole("button", { name: /editar/i });
  //   expect(editButton).toBeInTheDocument();
  //   const deleteButton = screen.getByRole("button", { name: /excluir/i });
  //   userEvent.click(deleteButton);
  //   expect(trBody.childNodes.length).toBe(0);
  // });
})
