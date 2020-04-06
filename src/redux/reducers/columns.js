import { ADD_CARD_TO_COLUMN, MOVE_CARD_TO_COLUMN } from 'redux/action-types'
import store from 'store'

const initialState = {
    columns: [
        {
            name: 'A',
            cards: [{ text: 'TODO1' }, { text: 'TODO2' }],
        },
        {
            name: 'B',
            cards: [{ text: 'TODO1' }, { text: 'TODO2' }],
        },
        {
            name: 'C',
            cards: [{ text: 'TODO1' }, { text: 'TODO2' }],
        },
        {
            name: 'D',
            cards: [{ text: 'TODO1' }, { text: 'TODO2' }],
        },
    ],
}

const updateLocalStore = (state) => {
    store.set('board', state)
}

updateLocalStore(initialState)

export default function (state = initialState, action) {
    switch (action.type) {
        case MOVE_CARD_TO_COLUMN: {
            const { nextIndex, currentIndex, card, cardIndex } = action.payload
            // first, remove from og column
            const columns = [
                ...state.columns.map((column, columnIndex) => {
                    if (columnIndex === currentIndex) {
                        return {
                            ...column,
                            cards: [
                                ...column.cards.filter(
                                    (card, index) => index !== cardIndex,
                                ),
                            ],
                        }
                    }

                    // next, add to column at `columnIndex`
                    if (columnIndex === nextIndex) {
                        return {
                            ...column,
                            cards: [...column.cards, card],
                        }
                    }

                    // otherwise just return same column
                    return column
                }),
            ]

            const nextState = {
                ...state,
                columns,
            }

            updateLocalStore(nextState)
            return nextState
        }

        case ADD_CARD_TO_COLUMN: {
            const { index: columnIndex, text } = action.payload
            const nextState = {
                ...state,
                columns: [
                    ...state.columns.map((column, index) => {
                        if (index === columnIndex) {
                            return {
                                ...column,
                                cards: [...column.cards, { text }],
                            }
                        }

                        return column
                    }),
                ],
            }
            updateLocalStore(nextState)

            return nextState
        }
        //   case TOGGLE_TODO: {
        //     const { id } = action.payload;
        //     return {
        //       ...state,
        //       byIds: {
        //         ...state.byIds,
        //         [id]: {
        //           ...state.byIds[id],
        //           completed: !state.byIds[id].completed
        //         }
        //       }
        //     };
        //   }
        default:
            return state
    }
}
