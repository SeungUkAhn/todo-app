import {Link, useParams} from "react-router-dom";

export default function WelcomeComponent(){

    const {username} = useParams()

    return(
        <div className="Welcome">
            <h1>Welcome! {username}</h1>
            <div>
                <Link to="/todos">할 일 목록으로 이동</Link>
            </div>
        </div>
    )
}
