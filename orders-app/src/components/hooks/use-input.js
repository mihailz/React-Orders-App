import {useReducer} from "react";

const defaultInputState = {
    value: '',
    isTouched: false
};

const inputReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.value, isTouched: state.isTouched};
    }
    if (action.type === 'BLUR') {
        return {value: state.value, isTouched: true};
    }
    if (action.type === 'RESET') {
        return {value: '', isTouched: false};
    }
    return defaultInputState;
}

const useInput = (validateInput, classes) => {
    const [inputState, dispatchInputState] = useReducer(inputReducer, defaultInputState);

    const isInputValid = validateInput(inputState.value);
    const hasError = !isInputValid && inputState.isTouched;
    const inputClasses = hasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;

    const onInputValueChangeHandler = event => {
        dispatchInputState({type: 'USER_INPUT', value: event.target.value});
    }

    const onInputBlur = () => {
        dispatchInputState({type: 'BLUR'});
    }

    const onInputReset = () => {
        dispatchInputState({type: 'RESET'});
    }

    return {
        value: inputState.value,
        isInputValid,
        hasError,
        onInputValueChangeHandler,
        onInputBlur,
        onInputReset,
        inputClasses
    };
}

export default useInput;
