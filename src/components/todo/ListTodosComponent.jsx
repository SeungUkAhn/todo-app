import {useEffect, useState} from "react";
import {retrieveAllTodosForUsername} from "./api/TodoApiService";

export default function ListTodosComponent(){

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

    const [todos, setTodos] = useState([])

    useEffect(
        () => refreshTodos(), []
    )

    function refreshTodos(){
        retrieveAllTodosForUsername('maicoding')
            .then(response => setTodos(response.data))
            .catch(error => console.log(error))
    }

    return(
        <div className="container">
            <h1>할 일 목록</h1>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>설명</td>
                        <td>완료여부</td>
                        <td>목표일</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
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