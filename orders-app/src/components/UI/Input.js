import classes from './Input.module.css';
import {useImperativeHandle, useRef} from "react";
import React from "react";

const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef();

    const getInputValue = () => {
        return inputRef.current.value;
    }

    useImperativeHandle(ref, () => {
        return {
            getInputValue: getInputValue
        }
    })

    return (
        <div className={`${classes.input}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                {...props.input}
            />
        </div>
    );
});

export default Input;
