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

export const editItem = (payload) => ({
  type: 'EDIT',
  payload,
});

export const salvaID = (payload) => ({
  type: 'salvarID',
  payload,
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

export const edicao = (ed, objeto) => async (dispatch) => {
  const response = await getCurrency();

  const { value, description, currency, method, tag, id } = ed;
  const payload = {
    id,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates: response,
  };
  const objetoUnido = objeto.concat(objeto, payload);
  const newset = [...new Set(objetoUnido)];
  newset.sort((a, b) => a.id - b.id);
  dispatch(editItem(newset));
};
