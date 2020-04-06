import { MOVE_CARD_TO_COLUMN, ADD_CARD_TO_COLUMN } from 'redux/action-types'

export const addCardToColumn = (index) => {
    const text = window.prompt('Card content?')
    return {
        type: ADD_CARD_TO_COLUMN,
        payload: { index, text },
    }
}

export const moveCardToColumn = ({ nextIndex, currentIndex, card, cardIndex }) => {
    return {
        type: MOVE_CARD_TO_COLUMN,
        payload: { nextIndex, currentIndex, card, cardIndex },
    }
}
