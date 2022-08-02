import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/header.css';

class Header extends Component {
  render() {
    const { info, allExpenses } = this.props;
    return (
      <div className="div">
        <span data-testid="email-field">{info}</span>
        <section className="moeda">
          <span data-testid="total-field">
            {allExpenses.reduce((acc, curr) => (acc + parseFloat(curr.value)
            * parseFloat(curr.exchangeRates[curr.currency].ask)), 0).toFixed(2)}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </section>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  info: state.user.email,
  allExpenses: state.wallet.expenses,
});

Header.propTypes = {
  info: PropTypes.string.isRequired,
  allExpenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
