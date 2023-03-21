import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import {useContext} from "react";
import CartContext from "../../context/cart-context";
import CartItem from "./CartItem";

const Cart = props => {
    const ctx = useContext(CartContext);
    const cartItems = ctx.items;
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        ctx.addItem({
            id: item.id,
            name: item.name,
            amount: 1,
            price: item.price
        })
    };

    return (
        <Modal onClick={props.onClick}>
            <ul className={classes['cart-items']}>
                {
                    cartItems.map((cartItem, index) => <CartItem
                        key={cartItem.id}
                        name={cartItem.name}
                        price={cartItem.price}
                        amount={cartItem.amount}
                        onAdd={cartItemAddHandler.bind(null, cartItem)}
                        onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
                    />)
                }
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${ctx.totalAmount.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                <button type={"button"} className={classes['button--alt']} onClick={props.onClick}>Close</button>
                {hasItems && <button type='button' className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;
