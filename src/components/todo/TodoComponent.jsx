import {useParams} from "react-router-dom";
import {retrieveTodoApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useEffect, useState} from "react";

export default function TodoComponent(){

    const {id} = useParams()

    const[description, setDescription] = useState('')

    const authContext = useAuth()
    const username = authContext.username

    useEffect(() => retrieveTodo(),[id])

    function retrieveTodo(){
        retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <h1>내용을 입력하세요</h1>
            <div>
                description: {description}
            </div>
        </div>
    )
}