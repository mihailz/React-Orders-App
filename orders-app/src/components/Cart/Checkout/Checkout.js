import classes from './Checkout.module.css';
import useInput from "../../hooks/use-input";

const Checkout = props => {

    const {
        value: nameInputValue,
        isInputValid: isNameInputValid,
        hasError: nameInputError,
        onInputValueChangeHandler: onNameInputChangeHandler,
        onInputBlur: onNameInputBlur,
        onInputReset: onNameInputReset,
        inputClasses: nameInputClasses
    } = useInput(value => value.trim().length > 0, classes);

    const {
        value: streetInputValue,
        isInputValid: isStreetInputValid,
        hasError: streetInputError,
        onInputValueChangeHandler: onStreetInputChangeHandler,
        onInputBlur: onStreetInputBlur,
        onInputReset: onStreetInputReset,
        inputClasses: streetInputClasses
    } = useInput(value => value.trim().length > 0, classes);

    const {
        value: postalCodeInputValue,
        isInputValid: isPostalCodeInputValid,
        hasError: postalCodeInputError,
        onInputValueChangeHandler: onPostalCodeInputChangeHandler,
        onInputBlur: onPostalCodeInputBlur,
        onInputReset: onPostalCodeInputReset,
        inputClasses: postalCodeInputClasses
    } = useInput(value => value.trim().length > 0, classes);

    const {
        value: cityInputValue,
        isInputValid: isCityInputValid,
        hasError: cityInputError,
        onInputValueChangeHandler: onCityInputChangeHandler,
        onInputBlur: onCityInputBlur,
        onInputReset: onCityInputReset,
        inputClasses: cityInputClasses
    } = useInput(value => value.trim().length > 0, classes);


    let formIsValid = false;

    if (isNameInputValid && isStreetInputValid && isPostalCodeInputValid && isCityInputValid) {
        formIsValid = true;
    }

    const onFormSubmit = event => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        const userData = {
            name: nameInputValue,
            street: streetInputValue,
            postalCode: postalCodeInputValue,
            city: cityInputValue
        };

        props.onFormSubmit(userData);

        onNameInputReset();
        onStreetInputReset();
        onPostalCodeInputReset();
        onCityInputReset();
    }

    return (
        <form onSubmit={onFormSubmit}>
            <div className={classes['form-controls']}>
                <div className={nameInputClasses}>
                    <label htmlFor="name">Your name</label>
                    <input
                        id='name'
                        type='text'
                        value={nameInputValue}
                        onChange={onNameInputChangeHandler}
                        onBlur={onNameInputBlur}
                    />
                    {nameInputError && <span className={classes['error-text']}>Name is required!</span>}
                </div>
                <div className={streetInputClasses}>
                    <label htmlFor="street">Street</label>
                    <input
                        id='street'
                        type='text'
                        value={streetInputValue}
                        onChange={onStreetInputChangeHandler}
                        onBlur={onStreetInputBlur}
                    />
                    {streetInputError && <span className={classes['error-text']}>Street is required!</span>}
                </div>
                <div className={postalCodeInputClasses}>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        id='postalCode'
                        type='text'
                        value={postalCodeInputValue}
                        onChange={onPostalCodeInputChangeHandler}
                        onBlur={onPostalCodeInputBlur}
                    />
                    {postalCodeInputError && <span className={classes['error-text']}>Postal Code is required!</span>}
                </div>
                <div className={cityInputClasses}>
                    <label htmlFor="city">City</label>
                    <input
                        id='city'
                        type='text'
                        value={cityInputValue}
                        onChange={onCityInputChangeHandler}
                        onBlur={onCityInputBlur}
                    />
                    {cityInputError && <span className={classes['error-text']}>City is required!</span>}
                </div>
            </div>
            <div className={classes.actions}>
                <button disabled={!formIsValid}  type='submit'>Confirm</button>
                <button onClick={props.onCancel} className={classes.button} type='button'>Cancel</button>
            </div>
        </form>
    );
}

export default Checkout;
