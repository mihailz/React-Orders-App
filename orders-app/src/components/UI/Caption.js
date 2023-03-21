import classes from './Caption.module.css';
import {Fragment} from "react";

const Caption = props => {

    return (
        <Fragment>
            <div className={classes['caption-container']}>
                <div className={classes.box}>
                    <h2>Delicious Food, Delivered To You</h2>
                    <p>
                        Choose your favourite meal from our board selection of
                        available meals and enjoy a delicious lunch or dinner
                        at home.
                    </p>
                    <p>
                        All our meals are cooked with high-quality ingredients,
                        just-in-time and of course by experienced chefs.
                    </p>
                </div>
            </div>
        </Fragment>
    );
}

export default Caption;
