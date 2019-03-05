import React, { Component } from 'react';

class Public extends Component {
  render() {
    return (
      <div className="sign-form">
        <div>
          <input type="text" placeholder="email" />
        </div>
        <div>
          <input type="password" placeholder="password" />
        </div>
        <div>
          <button className="btn">Sign in</button>
        </div>
        <div>
          Ошибка
        </div>
      </div>
    );
  }
}

export default Public;