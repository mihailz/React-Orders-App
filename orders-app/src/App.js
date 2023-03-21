import {useState} from "react";
import Header from "./components/UI/Header";
import AvailableMeals from "./components/Meal/AvailableMeals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./context/CartProvider";

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

function App() {

    const [meals, setMeals] = useState(DUMMY_MEALS);
    const [isCartShown, setIsCartShown] = useState(false);

    const closeCardHandler = () => {
        setIsCartShown(false);
    }

    const openCartHandler = () => {
        setIsCartShown(true);
    }

    return (
        <CartProvider>
            <Header onShowCart={openCartHandler}/>
            {isCartShown && <Cart onClick={closeCardHandler}/>}
            <main>
                <AvailableMeals meals={meals}/>
            </main>
        </CartProvider>
    );
}

export default App;
