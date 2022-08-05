// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INIT = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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

  case 'DELL':
    return {
      currencies: [...state.currencies],
      expenses: action.payload,
    };

  case 'EDIT':
    return {
      currencies: [...state.currencies],
      expenses: action.payload,
      editor: !state.editor,
      idToEdit: action.payload.id,
    };

  case 'salvarID':
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };

  default:
    return state;
  }
}

export default currency;
