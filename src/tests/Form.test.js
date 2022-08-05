import React from "react";
import { screen } from '@testing-library/dom'
import { cleanup } from "@testing-library/react/dist/pure";
import '@testing-library/jest-dom'

import { renderWithRouterAndRedux } from "./helpers/renderWith";
import WalletForm from "../components/WalletForm";

const initialState = {
  user: {
    email: 'teste@email.com',
  },
  wallet: {
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY',
     'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [],
  }
};

describe('Conjunto de testes do TrybeWallet', () => {
  // beforeEach(cleanup)
  it('Deveria renderizar componenetes do path /carteira',  () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState });
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
}); 