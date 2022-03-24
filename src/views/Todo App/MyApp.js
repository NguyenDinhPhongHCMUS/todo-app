import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTodo from 'components/AddTodo';
import ShowListTodos from 'components/ShowListTodos';
import "styles/MyApp.scss"
toast.configure()
class MyApp extends Component {
    state =
        {
            listTodos:
                window.localStorage.getItem("listTodos") ?
                    JSON.parse(window.localStorage.getItem("listTodos"))
                    : []
        }

    //Ham xu ly bat ky thay doi nao cua list Todos
    updateListTodos = (updatedListTodos) => {
        window.localStorage.setItem("listTodos", JSON.stringify(updatedListTodos));
        this.setState({
            listTodos: updatedListTodos
        })
    }
    //Ham xu ly them Todo
    handleAddTodo = (item) => {
        if (this.state.listTodos.some(todo => todo.title === item.title))
            toast.warn('🦄 Dữ liệu đã tồn tại!', { autoClose: 1500 });
        else {
            const updatedListTodos = [...this.state.listTodos, item];
            this.updateListTodos(updatedListTodos);
            toast.success('🦄 Thêm thành công!', { autoClose: 1500 });
        }
    }

    //Ham xu ly xoa Todo
    handleDeleteTodo = (item) => {
        const updatedListTodos = this.state.listTodos.filter(todo => todo.title !== item.title)
        this.updateListTodos(updatedListTodos);
        toast.success('🦄 Xoá thành công!', { autoClose: 1500 });
    }

    //Ham xu ly xoa Todo
    handleEditTodo = (item, editItem) => {
        const updatedListTodos = this.state.listTodos.map(todo => {
            if (todo.title === item.title) {
                return { ...todo, title: editItem };
            }
            return todo;
        });
        this.updateListTodos(updatedListTodos);
    }

    //Ham xu ly hoan thanh Todo
    handleCompleteTodo = (item) => {
        const updatedListTodos = this.state.listTodos.map(todo => {
            if (todo.title === item.title) {
                return { ...todo, isComplete: !item.isComplete };
            }
            return todo;
        });
        this.updateListTodos(updatedListTodos);
    }

    render() {
        return (
            <div className="my-app">
                <h1 className="title">Simple Todos App</h1>
                <AddTodo EditTodo={this.handleEditTodo} AddTodo={this.handleAddTodo} />
                <ShowListTodos
                    className="show-list-todos"
                    EditTodo={this.handleEditTodo}
                    DeleteTodo={this.handleDeleteTodo}
                    CompleteTodo={this.handleCompleteTodo}
                    listTodos={this.state.listTodos}
                />
                <p className="copy-right">© 2022 Created by Nguyễn Đình Phong</p>
            </div>
        );
    }
}
export default MyApp;