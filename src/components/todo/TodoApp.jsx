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

    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    function handleUsernameChange(e){
        setUsername(e.target.value)
    }

    function handlePasswordChange(e){
        console.log(e.target.value)
        setPassword(e.target.value)
    }

    function handleSubmit(){
        if(username==='maicoding' && password==='1234'){
            setShowSuccess(true)
            setShowError(false)
        }else{
            setShowSuccess(false)
            setShowError(true)
        }
    }

    return(
        <div className="Login">
            {showSuccess && <div className="successMessage">인증 성공</div>}
            {showError && <div className="errorMessage">인증 실패. 자격 증명(credential)을 확인하세요.</div>}

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
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
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