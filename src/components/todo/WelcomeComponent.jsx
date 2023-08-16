import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {retrieveHelloWorldPathVariable} from "./api/HelloWorldApiService";
import {useAuth} from "./security/AuthContext";

export default function WelcomeComponent(){

    const {username} = useParams()

    const authContext = useAuth()

    const [message, setMessage] = useState(null);

    function callHelloWorldRestApi(){
        alert('called');

        retrieveHelloWorldPathVariable('Mai', authContext.token)
            .then((response) => successResponse(response))
            .catch((response) => errorResponse(response))
            .finally(() => console.log('cleanup'))

    }

    function successResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(response){
        console.log(response)
    }

    return(
        <div className="Welcome">
            <h1>Welcome! {username}</h1>
            <div>
                <Link to="/todos">할 일 목록으로 이동</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>헬로월드 API 호출</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}
