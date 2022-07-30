import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currentThunk, currentThunkClic } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.botao = this.botao.bind(this);
    this.limparState = this.limparState.bind(this);
    this.estado = this.estado.bind(this);
    this.state = {
      id: 0,
      pagamento: '',
      valor: 0,
      descricao: '',
      moeda: '',
      categoria: '',
      soma: 0,
    };
  }

  componentDidMount() {
    const { moedaApi } = this.props;
    moedaApi();
  }

  limparState() {
    this.setState(
      {
        pagamento: '',
        valor: 0,
        descricao: '',
        moeda: '',
        categoria: '',
      },
    );
  }

  estado() {
    const { valor } = this.state;
    const num = +valor;
    this.setState((prev) => (
      {
        id: prev.id + 1,
        soma: prev.soma + num,
      }
    ));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
    );
  }

  botao() {
    const { botaoClic } = this.props;

    botaoClic(this.state);
    this.limparState();
  }

  render() {
    const { pagamento, valor, descricao, moeda, categoria } = this.state;
    return (
      <fieldset>
        Valor:
        <input
          type="number"
          data-testid="value-input"
          placeholder="valor"
          name="valor"
          value={ valor }
          onChange={ this.handleChange }
        />

        Descricao:
        <input
          type="text"
          data-testid="description-input"
          placeholder="descricao"
          name="descricao"
          value={ descricao }
          onChange={ this.handleChange }
        />

        Moeda:
        <select
          data-testid="currency-input"
          label="moeda"
          name="moeda"
          value={ moeda }
          onChange={ this.handleChange }
        >
          <option>AUD</option>
          <option>BTC</option>
          <option>CAD</option>
          <option>ARS</option>
          <option>CHF</option>
          <option>CNY</option>
          <option>DOGE</option>
          <option>ETH</option>
          <option>EUR</option>
          <option>GBP</option>
          <option>ILS</option>
          <option>JPY</option>
          <option>LTC</option>
          <option>USD</option>
          <option>XRP</option>
        </select>

        Modo de pagamento:
        <select
          label="pagamento"
          data-testid="method-input"
          name="pagamento"
          value={ pagamento }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        Categoria:
        <select
          data-testid="tag-input"
          label="despesa"
          name="categoria"
          value={ categoria }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <button
          type="button"
          onClick={ this.botao }
        >
          Adicionar despesa

        </button>

      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  moedaApi: () => dispatch(currentThunk()),
  botaoClic: (infos) => dispatch(currentThunkClic(infos)),
});

WalletForm.propTypes = {
  moedaApi: PropTypes.func.isRequired,
  botaoClic: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(WalletForm);
