import classes from './MealItem.module.css';
import Input from "../UI/Input";
import Button from "../UI/Button";
import {useContext, useRef, useState} from "react";
import CartContext from "../../context/cart-context";


const MealItem = props => {
    const ctx = useContext(CartContext);
    const amountInputRef = useRef();
    const [isAmountValid, setIsAmountValid] = useState(true);

    const onFormSubmitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.getInputValue();

        if (enteredAmount.trim().length === 0 || +enteredAmount < 1 || +enteredAmount > 5) {
            setIsAmountValid(false);
            return;
        }

        ctx.addItem({
            id: props.meal.id,
            name: props.meal.name,
            amount: +enteredAmount,
            price: props.meal.price
        })
    }

    return (
        <li className={classes['meal-wrapper']}>
            <div className={classes.meal}>
                <h3>{props.meal.name}</h3>
                <p className={classes.description}>{props.meal.description}</p>
                <span className={classes.price}>{props.meal.price}</span>
            </div>
            <div className={classes.actions}>
                <form onSubmit={onFormSubmitHandler}>
                    <Input
                        ref={amountInputRef}
                        label='Amount'
                        input={{
                            id: props.meal.id,
                            type: 'number',
                            min: '1',
                            max: '5',
                            step: '1',
                            defaultValue: '1',
                        }}
                    />
                    <Button type='submit'>+ Add</Button>
                    {!isAmountValid && <p>Please enter a valid amount (1 - 5)!</p>}
                </form>
            </div>
        </li>
    );
}

export default MealItem;
