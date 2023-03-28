import {useEffect, useState} from "react";
import Header from "./components/UI/Header";
import AvailableMeals from "./components/Meal/AvailableMeals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./context/CartProvider";
import useHttp from "./components/hooks/use-http";
import classes from './App.module.css';
//
// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

function App() {

    const [meals, setMeals] = useState([]);
    const [isCartShown, setIsCartShown] = useState(false);
    const {isLoading, error, sendRequest: fetchMeals} = useHttp();

    const closeCardHandler = () => {
        setIsCartShown(false);
    }

    const openCartHandler = () => {
        setIsCartShown(true);
    }

    useEffect(() => {
        const transformData = data => {
            const meals = [];
            for (let key in data) {
                const mealItem = {
                    ...data[key],
                    id: key
                };
                meals.push(mealItem);
            }

            setMeals(meals);
        }
        fetchMeals({
            URL: 'https://react-course-backend-4bc84-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
        }, transformData);
    }, [fetchMeals]);

    let content = '';

    if (isLoading) {
        content = <div className={classes.loader}>Loading data...</div>;
    }

    if (error) {
        content = <div className={classes.error}>{error}</div>;
    }

    if (meals.length > 0) {
       content = <AvailableMeals meals={meals} />
    }

    return (
        <CartProvider>
            <Header onShowCart={openCartHandler}/>
            {isCartShown && <Cart onClick={closeCardHandler}/>}
            <main>
                {content}
            </main>
        </CartProvider>
    );
}

export default App;
