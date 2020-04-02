import React from "react";

import styles from './Column.module.scss'
import Card from 'components/Card/Card'

import { connect } from "react-redux";
import { moveCardToColumn } from "redux/actions";

const Column = ({ index: columnIndex, name, cards, onAddClick, moveCardToColumn }) => (
  <li className={styles.columnItem}>
    <header className={[styles.columnHeader, styles[`columnHeader--${columnIndex + 1}`]].filter(Boolean).join(' ')}>{name}</header>
    {cards.map((card, index) => {
        const canMoveNext = columnIndex !== 3
        const canMovePrev = columnIndex !== 0

        const handleNextClick = () => {
            moveCardToColumn({ currentIndex: columnIndex, nextIndex: columnIndex + 1, card, cardIndex: index })
        }

        const handlePrevClick = () => {
            moveCardToColumn({ currentIndex: columnIndex, nextIndex: columnIndex - 1, card, cardIndex: index })
        }

      return (<Card key={index} onNextClick={handleNextClick} onPrevClick={handlePrevClick} canMoveNext={canMoveNext} canMovePrev={canMovePrev} {...card} />)
    })}
    <div onClick={onAddClick}>Add Card</div>
  </li>
);



export default connect(
null,
{ moveCardToColumn }
)(Column);
