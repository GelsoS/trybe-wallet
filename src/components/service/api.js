const link = 'https://economia.awesomeapi.com.br/json/all';

const getCurrency = () => (
  fetch(link)
    .then((response) => (
      response.json()
    ))
);

export default getCurrency;
