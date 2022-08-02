import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currentThunk, currentThunkClic } from '../redux/actions';
import '../css/form.css';

const alimentacao = 'Alimentação';
class WalletForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonClic = this.buttonClic.bind(this);
    this.limparState = this.limparState.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { moedaApi } = this.props;
    moedaApi();
  }

  limparState() {
    this.setState((prev) => (
      {
        id: prev.id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: alimentacao,
        exchangeRates: [],
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

  buttonClic() {
    const { botaoClic } = this.props;
    botaoClic(this.state);

    this.limparState();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { allCurency } = this.props;
    return (
      <fieldset>
        Valor:
        <input
          type="number"
          data-testid="value-input"
          placeholder="valor"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />

        Descricao:
        <input
          type="text"
          data-testid="description-input"
          placeholder="descricao"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />

        Moeda:
        <select
          data-testid="currency-input"
          label="moeda"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {allCurency.map((all, i) => <option key={ i }>{all}</option>)}

        </select>

        Modo de pagamento:
        <select
          label="pagamento"
          data-testid="method-input"
          name="method"
          value={ method }
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
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <button
          className="add"
          type="button"
          onClick={ this.buttonClic }
        >
          Adicionar despesa

        </button>

      </fieldset>
    );
  }
}
const mapStateToProps = (state) => ({
  allCurency: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  moedaApi: () => dispatch(currentThunk()),
  botaoClic: (infos) => dispatch(currentThunkClic(infos)),
});

WalletForm.propTypes = {
  moedaApi: PropTypes.func.isRequired,
  botaoClic: PropTypes.func.isRequired,
  allCurency: PropTypes.arrayOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
