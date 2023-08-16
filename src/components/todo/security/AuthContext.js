import {createContext, useContext, useState} from "react";
import {executeBasicAuthenticationService} from "../api/HelloWorldApiService";
import {apiClient} from "../api/ApiClient";

//컨텍스트 생성하기
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//다른 컴포넌트들과 생성된 컨택스트를 공유하기
export default function AuthProvider({children}){

    //컨텍스트에 상태 부여
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    // function login(username, password){
    //     if(username==='maicoding' && password==='1234'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     }else{
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    async function login(username, password){

        const baToken = 'Basic ' + window.btoa(username + ":" + password)   //base64 인코딩

        try{
            const response = await executeBasicAuthenticationService(baToken)

            if(response.status === 200){
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = baToken
                        return config
                    }
                )
                return true
            }else{
                logout()
                return false
            }
        } catch(e){
            logout()
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}