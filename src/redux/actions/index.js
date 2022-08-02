import getCurrency from '../../components/service/api';

export const user = (value) => ({
  type: 'USER',
  value,
});

export const getApi = (value) => ({
  type: 'API',
  value,
});

export const informacoes = (payload) => ({
  type: 'DADOS',
  payload,
});

export const deleteItem = (payload) => ({
  type: 'DELL',
  payload,
});

export const editItem = (info) => ({
  type: 'EDIT',
  info,
});

export const currentThunk = () => async (dispatch) => {
  const response = await getCurrency();

  dispatch(getApi(response));
};

export const currentThunkClic = (value) => async (dispatch) => {
  const response = await getCurrency();
  const payload = {
    ...value,
    exchangeRates: response,
  };
  dispatch(informacoes(payload));
};

export const deleteThunk = (carga) => (dispatch) => {
  dispatch(deleteItem(carga));
};

export const editarInfo = (info) => (dispatch) => {
  dispatch(editItem(info));
};
