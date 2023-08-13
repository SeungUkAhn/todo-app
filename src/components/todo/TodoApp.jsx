import './TodoApp.css'
import {BrowserRouter, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                    <Route path='/welcome/:username' element={<WelcomeComponent/>}/>
                    <Route path='/todos' element={<ListTodosComponent/>}/>/>
                    <Route path='/*' element={<ErrorComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function LoginComponent(){

    const [username, setUsername] = useState('maicoding')
    const [password, setPassword] = useState('');

    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate();

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
            navigate(`/welcome/${username}`)
        }else{
            setShowSuccess(false)
            setShowError(true)
        }
    }

    return(
        <div className="Login">
            <h1>Login</h1>
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

    const {username} = useParams()

    return(
        <div className="Welcome">
            <h1>Welcome! {username}</h1>
            <div>
                Welcome Component
            </div>
        </div>
    )
}

function ErrorComponent(){
    return(
        <div className="Error">
            <h1>에러 발생</h1>
            <div>
                문제를 해결 중에 있습니다.
            </div>
        </div>
    )
}

function ListTodosComponent(){

    const todos = [
                    {id: 1, desciption: 'AWS 공부하기'},
                    {id: 2, desciption: 'Docker 공부하기'},
                    {id: 3, desciption: 'DevOps 공부하기'}
                ]

    return(
        <div className="ListTodos">
            <h1>할 일 목록</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>description</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.desciption}</td>
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