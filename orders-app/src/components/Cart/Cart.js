import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import {Fragment, useContext, useState} from "react";
import CartContext from "../../context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout/Checkout";
import useHttp from "../hooks/use-http";

const Cart = props => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [isRequestSent, setIsRequestSent] = useState(false);
    const {isLoading, error, sendRequest: postCheckoutData} = useHttp();

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

    const onUserFormSubmitHandler = (userData) => {
        setIsRequestSent(false);
        postCheckoutData({
            URL: 'https://react-course-backend-4bc84-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            },
            body: {
                order: {
                    user: userData,
                    items: cartItems
                }
            }
        }, () => {});
        setIsRequestSent(true);
        ctx.clearCart();
    }

    const showCheckoutForm = () => {
        setShowCheckout(true);
    }

    const closeCheckoutForm = () => {
        setShowCheckout(false);
    }


    let content = <Fragment>
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
        {cartItems.length > 0 && showCheckout && <Checkout onCancel={closeCheckoutForm}
                                                           onFormSubmit={onUserFormSubmitHandler}/>}
        {!showCheckout &&
            <div className={classes.actions}>
                <button type={"button"} className={classes['button--alt']} onClick={props.onClick}>Close</button>
                {hasItems &&
                    <button type='button' onClick={showCheckoutForm} className={classes.button}>Order</button>}
            </div>
        }
    </Fragment>

    if (isRequestSent && isLoading) {
        content = <p>Sending data...</p>
    }

    if (isRequestSent && !error && !isLoading) {
        content = <Fragment>
            <p>Order is sent successfully...</p>
            <div className={classes.actions}>
                <button type={"button"} className={classes['button--alt']} onClick={props.onClick}>Close</button>
            </div>
        </Fragment>
    }

    if (isRequestSent && error) {
        content = <span>{error}</span>
    }

    return (
        <Modal onClick={props.onClick}>
            {content}
        </Modal>
    );
}

export default Cart;
