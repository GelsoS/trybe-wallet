import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currentThunk, currentThunkClic, edicao } from '../redux/actions';
import '../css/form.css';

const alimentacao = 'Alimentação';
class WalletForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.limparState = this.limparState.bind(this);
    this.salvarEdicao = this.salvarEdicao.bind(this);
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

  salvarEdicao() {
    const { value, description, currency, method, tag } = this.state;
<<<<<<< HEAD
    const { editor, edit, botaoClic, expenses, idToEdit } = this.props;
    const editado = expenses.filter((element) => element.id !== idToEdit);

    if (editor) {
=======
    const { editor, edit, botaoClic, expenses } = this.props;

    if (editor) {
      const { idToEdit } = this.props;
      const editado = expenses.filter((element) => element.id !== idToEdit);
      console.log(idToEdit);
>>>>>>> 031d48fbdf0af7bab669ac57804b40d1617034a8
      const ed = {
        id: Number(idToEdit),
        value,
        description,
        currency,
        method,
        tag,
      };
      edit(ed, editado);
    } else {
      botaoClic(this.state);
      this.limparState();
    }
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { allCurency, editor } = this.props;
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
          onClick={ this.salvarEdicao }
        >
          {!editor ? 'Adicionar despesa' : 'Editar despesa'}

        </button>

      </fieldset>
    );
  }
}
const mapStateToProps = (state) => ({
  allCurency: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});
const mapDispatchToProps = (dispatch) => ({
  moedaApi: () => dispatch(currentThunk()),
  botaoClic: (infos) => dispatch(currentThunkClic(infos)),
  edit: (edit, obj) => dispatch(edicao(edit, obj)),
});

WalletForm.propTypes = {
<<<<<<< HEAD
  moedaApi: PropTypes.func,
  botaoClic: PropTypes.func,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
  expenses: PropTypes.arrayOf(Array),
  edit: PropTypes.func,
  allCurency: PropTypes.arrayOf(Array),
}.isRequired;
=======
  moedaApi: PropTypes.func.isRequired,
  botaoClic: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(Array).isRequired,
  edit: PropTypes.func.isRequired,
  allCurency: PropTypes.arrayOf(Array).isRequired,
};
>>>>>>> 031d48fbdf0af7bab669ac57804b40d1617034a8

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
