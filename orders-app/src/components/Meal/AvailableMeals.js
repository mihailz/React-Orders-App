import classes from './AvailableMeals.module.css';
import MealItem from "./MealItem";

const AvailableMeals = props => {

    return (
        <div className={classes.meals}>
            <ul>
                {
                    props.meals.map(mealItem =>
                        <MealItem
                            key={mealItem.id}
                            meal={mealItem}
                        />)
                }
            </ul>
        </div>
    );
}

export default AvailableMeals;
