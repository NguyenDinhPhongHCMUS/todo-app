import React, { Component } from "react";
import { toast } from "react-toastify";
import "styles/ShowTodo.scss"
import { FaTrash, FaPenSquare, FaCheck, FaSave } from "react-icons/fa"
import classNames from "classnames";
class ShowTodo extends Component {
    state =
        {
            editTodo: {
                title: "",
                isComplete: false
            },
            isEditing: false
        }

    //Ham reset EditTodo
    resetEditTodo = () => {
        this.setState(prevState => {
            let editTodo = Object.assign({}, prevState.editTodo);
            editTodo.title = ""
            editTodo.isComplete = false
            return { editTodo };
        })
    }

    //Ham xu ly xoa Todo
    handleDeleteTodo = (item) => {
        this.setState(
            {
                isEditing: false
            }
        )
        this.resetEditTodo()
        this.props.DeleteTodo(item)
    }

    //Ham xu ly khi bam edit todo
    handleEditTodo = (item) => {
        this.setState(
            {
                isEditing: true
            }
        )
        this.setState(prevState => {
            let editTodo = Object.assign({}, prevState.editTodo);
            editTodo.title = item.title
            editTodo.isComplete = item.isComplete
            return { editTodo };
        })
    }

    //Ham xu ly khi change Todo
    handleChangeEditInput = (item, event) => {
        this.props.EditTodo(item, event.target.value)
        this.setState(prevState => {
            let editTodo = Object.assign({}, prevState.editTodo);
            editTodo.title = event.target.value;
            editTodo.isComplete = item.isComplete
            return { editTodo };
        })
    }

    //Ham xu ly luu todo
    handleSaveEditTodo = () => {
        toast.success("Lưu thành công!", { autoClose: 1500 })
        this.setState(
            {
                isEditing: false
            }
        )
        this.resetEditTodo()
    }

    //Ham xu ly hoan thanh todo
    handleCompleteTodo = (item) => {
        this.props.CompleteTodo(item)
    }
    render() {
        let item = this.props.item
        let isEmpty = this.state.editTodo.title === "" && item.title !== ""
        let widthScreen = window.innerWidth
        return (
            <div className={classNames("todo-item")}>
                {isEmpty ?
                    <>
                        {this.state.isEditing === false &&
                            <p className={classNames("todo-item__title",
                                { complete: item.isComplete })}>{item.title}
                            </p>
                        }
                        {widthScreen > 740 ?
                            <>
                                <button className="todo-item__button todo-item__button--delete"
                                    onClick={() => this.handleDeleteTodo(item)}>
                                    Delete
                                </button>
                                <button className="todo-item__button todo-item__button--edit"
                                    onClick={() => this.handleEditTodo(item)}>
                                    Edit
                                </button>
                                <button className="todo-item__button todo-item__button--primary"
                                    onClick={() => this.handleCompleteTodo(item)} >
                                    Complete
                                </button>
                            </>
                            :
                            <>
                                <FaTrash className="todo-item__icon todo-item__icon--delete"
                                    onClick={() => this.handleDeleteTodo(item)} />
                                <FaPenSquare className="todo-item__icon todo-item__icon--edit"
                                    onClick={() => this.handleEditTodo(item)}
                                />
                                <FaCheck className="todo-item__icon todo-item__icon--primary"
                                    onClick={() => this.handleCompleteTodo(item)}
                                />
                            </>
                        }
                    </>
                    :
                    <>
                        {this.state.isEditing === false &&
                            <p className={classNames("todo-item__title",
                                { complete: item.isComplete })}>{item.title}
                            </p>
                        }
                        {this.state.editTodo.title === item.title &&
                            <input className={classNames("todo-item__input", { edit: this.state.isEditing })}
                                onChange={(event) => this.handleChangeEditInput(item, event)}
                                value={this.state.editTodo.title} type="text" name="title"
                            />
                        }
                        {
                            widthScreen > 740 ?
                                <>
                                    <button className="todo-item__button todo-item__button--delete"
                                        onClick={() => this.handleDeleteTodo(item)}>
                                        Delete
                                    </button>
                                    <button className="todo-item__button todo-item__button--primary"
                                        onClick={() => this.handleSaveEditTodo(item)}>
                                        Save
                                    </button>
                                    <button className="todo-item__button todo-item__button--primary"
                                        onClick={() => this.handleCompleteTodo(item)} >
                                        Complete
                                    </button>
                                </>
                                :
                                <>
                                    <FaTrash className="todo-item__icon todo-item__icon--delete"
                                        onClick={() => this.handleDeleteTodo(item)} />
                                    <FaSave className="todo-item__icon todo-item__icon--edit"
                                        onClick={() => this.handleSaveEditTodo(item)} />
                                    <FaCheck className="todo-item__icon todo-item__icon--primary"
                                        onClick={() => this.handleCompleteTodo(item)}
                                    />
                                </>
                        }
                    </>
                }
            </div>
        )
    }
}
export default ShowTodo;