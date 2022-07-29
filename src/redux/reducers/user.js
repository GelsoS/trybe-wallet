// Esse reducer será responsável por tratar as informações da pessoa usuária
const INIT_STATE = {
  email: '',
};

function user(state = INIT_STATE, action) {
  switch (action.type) {
  case 'USER':
    return {
      ...state,
      email: action.value,
    };
  default:
    return state;
  }
}

export default user;
