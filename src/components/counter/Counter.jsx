import './Counter.css'
import {useState} from "react";
import PropTypes from "prop-types";

export default function Counter(){

    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by){
        setCount(count + by)
    }

    return (
        <>
            <span className="totalCount">{count}</span>
            <CounterButton by={1} incrementMethod={incrementCounterParentFunction}/>
            <CounterButton by={2} incrementMethod={incrementCounterParentFunction}/>
            <CounterButton by={3} incrementMethod={incrementCounterParentFunction}/>
        </>
    )
}

function CounterButton({by, incrementMethod}){

    const [count, setCount] = useState(0);

    function incrementCounterFunction(){
        setCount(count + by)
        incrementMethod(by)
    }

    function decrementCounterFunction(){
        setCount(count - by)
        incrementMethod(-by)
    }

    return(
        <div className="Counter">
            <div>
                <button className="counterButton"
                        onClick={incrementCounterFunction}
                >+{by}</button>
                <button className="counterButton"
                        onClick={decrementCounterFunction}
                >-{by}</button>
            </div>
        </div>
    )
}

CounterButton.propTypes = {
    by: PropTypes.number
}

CounterButton.defaultProps = {
    by: 1
}