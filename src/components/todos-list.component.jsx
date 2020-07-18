import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FilterButton from "./dropdown";
import dustbin from "../assets/dustbin.svg";

const TodoRow = props => (
  <tr>
    <td>{props.todo.todo_description}</td>
    <td>{props.todo.todo_responsible}</td>
    <td>{props.todo.todo_priority}</td>
    <td>
      <Link to={`/todos/edit/${props.todo._id}`}>Edit</Link>
    </td>
    <td>
      <img
        style={{ cursor: "pointer" }}
        src={dustbin}
        width="20"
        height="20"
        alt="delete task"
        onClick={props.deleteTodo}
      />
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

    console.log("todos:", todos);

    return todos
      .filter(todo => {
        switch (filter) {
          case "Active":
            return !todo.todo_completed;
          case "Inactive":
            return todo.todo_completed;
          case "All":
            return true;
          default:
            return true;
        }
      })
      .map((todo, i) => {
        return (
          <TodoRow
            todo={todo}
            key={i}
            deleteTodo={() => this.props.deleteTodo(todo._id)}
          />
        );
      });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <FilterButton
          options={["Active", "Inactive","All"]}
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
              <th>delete</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TodosList);
