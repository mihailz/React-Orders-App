import CartContext from "./cart-context";
import {useReducer} from "react";


const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const newTotalAmount = state.totalAmount + action.item.amount * action.item.price;

        const existingCartItemIndex = state.items
            .findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {
            let updatedItem;
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount,
        }
    }
    if (action.type === 'REMOVE_ITEM') {
        const itemIndex = state.items.findIndex(item => item.id === action.id);
        const removableItem = state.items[itemIndex];
        let updatedItems = [...state.items];
        let newTotalAmount;

        if (removableItem && removableItem.amount > 1) {
            const updatedItem = {
                ...removableItem,
                amount: removableItem.amount - 1
            }
            updatedItems[itemIndex] = updatedItem;

        } else {
            updatedItems.splice(itemIndex, 1);
        }

        newTotalAmount = state.totalAmount - removableItem.price;

        return {
            items: updatedItems,
            totalAmount: newTotalAmount,
        };
    }
    return defaultCartState;
};

// This is a container like component in which we can render any other component that needs
// access to the cartContent
const CartProvider = props => {

    const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartState({type: 'ADD_ITEM', item: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartState({type: 'REMOVE_ITEM', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    // We need to provide the value as an object.
    // This will be the dynamic value that will be stored in the CartContext
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
