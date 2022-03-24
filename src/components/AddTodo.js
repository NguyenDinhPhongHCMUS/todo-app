import React, { Component } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "styles/AddTodo.scss"
toast.configure()
class AddTodo extends Component {

    state =
        {
            title: "",
            isComplete: false
        }

    //Ham xu ly thay doi trong input
    handleOnChangeInput = (event) => {
        this.setState(
            {
                title: event.target.value
            }
        )
    }

    //Ham xu ly submit input
    handleSubmitInput = (event) => {
        if (this.state.title === "") {
            toast.warn('Dữ liệu không được trống!', { autoClose: 1500 });
        }
        else {
            this.props.AddTodo(this.state)
            this.setState(
                {
                    title: "",
                    isComplete: false
                }
            )
        }
        event.preventDefault();
    }

    render() {
        return (
            <form className="add-todo">
                <input className="add-todo__input--text"
                    value={this.state.title} type="text" name="title"
                    onChange={(event) => this.handleOnChangeInput(event)}
                />
                <input className="add-todo__input--submit"
                    onClick={(event) => this.handleSubmitInput(event)}
                    type="submit" value="Submit"
                />
            </form>
        )
    }
};

export default AddTodo;