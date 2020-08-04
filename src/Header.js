import React, { Component } from 'react';
import './App.css';

class Header extends Component {
  render() {
    return (
        <div className="App-header">
			<div className="mypic">image</div>
			<div className="myname">일병 <strong>도정근</strong></div>
        </div>
    );
  }
}

export default Header;

