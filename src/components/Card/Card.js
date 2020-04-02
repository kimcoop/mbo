import React from "react";

import styles from './Card.module.scss'

const Card = ({ text, moveCardToColumn, onNextClick, onPrevClick, canMovePrev, canMoveNext }) =>  {
    return (
        <div className={styles.card}>
            {canMovePrev && <div onClick={onPrevClick}>Prev</div> }
            <span className={styles.text}>{ text }</span>
            {canMoveNext && <div onClick={onNextClick}>Next</div> }
        </div>
    );
}

export default Card