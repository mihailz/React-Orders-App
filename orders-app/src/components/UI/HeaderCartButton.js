import classes from './HeaderCartButton.module.css';
import React, {useContext, useEffect, useState} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../context/cart-context";

const HeaderCartButton = props => {

    const ctx = useContext(CartContext);
    const [isAnimating, setIsAnimating] = useState(false);
    const {items} = ctx;
    const numberOfCartItems = ctx.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
    }, 0);

    const btnClasses = `${classes.button} ${isAnimating ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
            <CartIcon/>
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;
