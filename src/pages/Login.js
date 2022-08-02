import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user } from '../redux/actions';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.habilita = this.habilita.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      email: '',
      password: '',
      habilitar: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.habilita);
  }

  habilita() {
    const cinco = 5;
    const { password, email } = this.state;
    const regex = new RegExp(/[a-z0-9]+@([\w-]+\.)+[\w-]{2,3}$/i);
    const emailtest = regex.test(email);
    // console.log(regex.test('gelso02@live.com'));

    if (password.length > cinco && emailtest) {
      this.setState(
        {
          habilitar: false,
        },
      );
    } else {
      this.setState(
        {
          habilitar: true,
        },
      );
    }
  }

  login() {
    const { usuario, history: { push } } = this.props;
    const { email } = this.state;
    usuario(email);
    push('/carteira');
  }

  render() {
    const { habilitar } = this.state;

    return (
      <div>
        <section className="section">
          E-mail:
          <input
            className="input"
            name="email"
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ this.handleChange }

          />
          Senha:
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handleChange }

          />
          <button
            className="button"
            type="button"
            onClick={ this.login }
            disabled={ habilitar }
          >
            Entrar
          </button>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  usuario: (username) => dispatch(user(username)),
});

Login.propTypes = {
  usuario: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
