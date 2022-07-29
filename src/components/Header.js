import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { info } = this.props;
    return (
      <div>
        <span data-testid="email-field">{info}</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return ({
    info: state.user.email,

  });
};
Header.propTypes = {
  info: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Header);
