import {useEffect, useState} from "react";
import {deleteTodoApi, retrieveAllTodosForUsernameApi} from "./api/TodoApiService";

export default function ListTodosComponent(){

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState('')

    useEffect(
        () => refreshTodos(), []
    )

    function refreshTodos(){
        retrieveAllTodosForUsernameApi('maicoding')
            .then(response => setTodos(response.data))
            .catch(error => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi('maicoding', id)
            .then(
                () => {
                    setMessage(`todo(id:${id}) is deleted`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }

    return(
        <div className="container">
            <h1>할 일 목록</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>설명</th>
                        <th>완료여부</th>
                        <th>목표일</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning"
                                                onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                </tr>
                            )
                        )
                    }

                    </tbody>
                </table>
            </div>
        </div>
    )
}