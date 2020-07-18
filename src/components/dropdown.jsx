import React, { Component } from "react";
import styles from "./dropdown.module.css";

export default class FilterButton extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }

  render() {
    const options = this.props.options;

    return (
      <div className={this.state.open ? "dropdown show" : "dropdown"}>
        {this.state.open && (
          <div className={styles.backdrop} onClick={this.toggleDropdown} />
        )}
        <button
          type="button"
          className="btn btn-info dropdown-toggle"
          onClick={this.toggleDropdown}
        >
          {this.props.mainText}
        </button>
        <ul
          className={this.state.open ? "dropdown-menu show" : "dropdown-menu"}
        >
          {options.map(option => (
            <li
              className="dropdown-item"
              key={option}
              onClick={() => {
                this.toggleDropdown();
                this.props.onSelect(option);
              }}
              style={{ cursor: "pointer" }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
