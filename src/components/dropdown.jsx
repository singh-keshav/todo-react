import React, { Component } from "react";

export default class FilterButton extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.dropdownBtnToggle = this.dropdownBtnToggle.bind(this);
    this.optionClickHandler = this.dropdownBtnToggle.bind(this);
  }

  dropdownBtnToggle() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }

  render() {
    const options = this.props.options;

    return (
      <div className={this.state.open ? "dropdown show" : "dropdown"}>
        <button
          type="button"
          className="btn btn-info dropdown-toggle"
          onClick={this.dropdownBtnToggle}
        >{this.props.mainText}
        </button>
        <ul
          className={this.state.open ? "dropdown-menu show" : "dropdown-menu"}
        >
          {options.map(option => (
            <li
              className="dropdown-item"
              key={option}
              onClick={() => this.props.onSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
