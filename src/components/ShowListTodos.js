import React, { Component } from "react";
import ShowTodo from "./ShowTodo";
class ShowListTodos extends Component {
    render() {
        let listTodos = this.props.listTodos;
        return (
            <div className="show-list-todos">
                {listTodos.map((item, index) =>
                    <ShowTodo
                        DeleteTodo={this.props.DeleteTodo}
                        EditTodo={this.props.EditTodo}
                        CompleteTodo={this.props.CompleteTodo}
                        item={item} key={index}
                    />
                )}
            </div>
        )
    }
}
export default ShowListTodos;