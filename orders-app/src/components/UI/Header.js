import classes from './Header.module.css';
import React from "react";
import imageSrc from '../../images/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";
import Caption from "./Caption";
import {Fragment} from "react";

const Header = props => {

    return (
        <Fragment>
            <div className={classes['header-wrapper']}>
                <div className={classes.header}>
                    <h1>ReactMeals</h1>
                    <HeaderCartButton onClick={props.onShowCart}/>
                </div>
                <div className={classes['main-image']}>
                    <img src={imageSrc} alt='meals'/>
                </div>
                <Caption/>
            </div>
        </Fragment>
    );
}

export default Header;
