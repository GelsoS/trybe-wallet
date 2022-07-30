import getCurrency from '../../components/service/api';

export const user = (value) => ({
  type: 'USER',
  value,
});

export const getApi = (value) => ({
  type: 'API',
  value,
});

export const informacoes = (cotacao, value) => ({
  type: 'DADOS',
  value,
  cotacao,
});

export const currentThunk = () => async (dispatch) => {
  const response = await getCurrency();

  dispatch(getApi(response));
};

export const currentThunkClic = (value) => async (dispatch) => {
  const response = await getCurrency();

  dispatch(informacoes(response, value));
};
