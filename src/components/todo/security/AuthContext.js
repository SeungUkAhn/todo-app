import {createContext, useContext, useState} from "react";

//컨텍스트 생성하기
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//다른 컴포넌트들과 생성된 컨택스트를 공유하기
export default function AuthProvider({children}){

    //컨텍스트에 상태 부여
    const [number, setNumber] = useState(10)

    const [isAuthenticated, SetAuthenticated] = useState(false)

    //setInterval(() => setNumber(number + 1), 10000)

    function login(username, password){
        if(username==='maicoding' && password==='1234'){
            SetAuthenticated(true)
            return true
        }else{
            SetAuthenticated(false)
            return false
        }
    }

    return(
        <AuthContext.Provider value={{number, isAuthenticated, SetAuthenticated, login}}>
            {children}
        </AuthContext.Provider>
    )
}