import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/table.css';
import PropTypes from 'prop-types';
import { deleteThunk, editarInfo } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  delete(curr) {
    const { expenses, deleteButton } = this.props;
    const expensesFilt = expenses.filter((d) => d !== curr);
    deleteButton(expensesFilt);
  }

  editItem(curr) {
    const { expenses, editar } = this.props;
    const edit = expenses.filter((c) => c === curr);
    console.log(edit);
    editar(edit);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>

          { expenses.map((curr, i) => (
            <tr key={ i }>
              <td>{curr.description}</td>
              <td>{curr.tag}</td>
              <td>{curr.method}</td>
              <td>{Number(curr.value).toFixed(2)}</td>
              <td>{curr.exchangeRates[curr.currency].name}</td>
              <td>{Number(curr.exchangeRates[curr.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(curr.value)
            * parseFloat(curr.exchangeRates[curr.currency].ask)).toFixed(2)}
              </td>
              <td>{curr.exchangeRates[curr.currency].codein}</td>
              <td>
                <button
                  key={ curr.id }
                  onClick={ () => this.editItem(curr) }
                  className="edit"
                  type="button"
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  key={ curr.id }
                  onClick={ () => this.delete(curr) }
                  className="del"
                  type="button"
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteButton: (despesa) => dispatch(deleteThunk(despesa)),
  editar: (info) => dispatch(editarInfo(info)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteButton: PropTypes.func.isRequired,
  editar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
