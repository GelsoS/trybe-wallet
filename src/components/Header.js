import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { info, current } = this.props;
    const t = current[0];
    console.log(t);

    return (
      <div>
        <span data-testid="email-field">{info}</span>
        <span data-testid="total-field">
          {t !== undefined ? t.soma : '0'}
        </span>
        <span data-testid="header-currency-field">BRL</span>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  info: state.user.email,
  current: state.wallet.expenses,
});

Header.propTypes = {
  info: PropTypes.string.isRequired,
  current: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
