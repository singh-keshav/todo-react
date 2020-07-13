import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FilterButton from "./dropdown";

const TodoRow = props => (
  <tr>
    <td>{props.todo.todo_description}</td>
    <td>{props.todo.todo_responsible}</td>
    <td>{props.todo.todo_priority}</td>
    <td>
      <Link to={`/todos/edit/${props.todo._id}`}>Edit</Link>
    </td>
  </tr>
);

class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: null };
  }

  handleclick(e) {
    this.setState({ filter: e });
  }

  todoList() {
    const todos = this.props.todos;
    const filter = this.state.filter;

    return todos
      .filter(todo => {
        switch (filter) {
          case "Active":
            return !todo.todo_completed;
          case "Inactive":
            return todo.todo_completed;
          default:
            return true;
        }
      })
      .map(function(currentTodo, i) {
        return <TodoRow todo={currentTodo} key={i} />;
      });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <FilterButton
          options={["Active", "Inactive"]}
          mainText={"filter"}
          onSelect={this.handleclick.bind(this)}
        />

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TodosList);
