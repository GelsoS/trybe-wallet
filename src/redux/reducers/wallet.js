// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INIT = {
  currencies: [],
  expenses: [],
};

function currency(state = INIT, action) {
  switch (action.type) {
  case 'API':
    return {
      ...state,
      currencies: Object.keys(action.value).filter((a) => (
        a !== 'USDT'
      )),
    };

  case 'DADOS':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],

    };
  default:
    return state;
  }
}

export default currency;
