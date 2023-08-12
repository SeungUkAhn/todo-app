import './TodoApp.css'
import {useState} from "react";

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <LoginComponent/>
            {/*<WelcomeComponent/>*/}
        </div>
    )
}

function LoginComponent(){

    const [username, setUsername] = useState('maicoding')
    const [password, setPassword] = useState('');

    function handleUsernameChange(e){
        setUsername(e.target.value)
    }

    function handlePasswordChange(e){
        console.log(e.target.value)
        setPassword(e.target.value)
    }

    return(
        <div className="Login">
            <div className="loginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login">Login</button>
                </div>
            </div>
        </div>
    )
}

function WelcomeComponent(){
    return(
        <div className="Welcome">
            Welcome Component
        </div>
    )
}