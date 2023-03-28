import classes from './AvailableMeals.module.css';
import MealItem from "./MealItem";

const AvailableMeals = props => {

    let content = <div style={{
        'textAlign': 'center'
    }}>No meals data...</div>;

    if (props.meals.length > 0) {
        content = props.meals.map(mealItem =>
            <MealItem
                key={mealItem.id}
                meal={mealItem}
            />)
    }

    return (
        <div className={classes.meals}>
            <ul>
                {
                    content
                }
            </ul>
        </div>
    );
}

export default AvailableMeals;
