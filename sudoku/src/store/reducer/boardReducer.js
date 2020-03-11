import { SET_BOARD, SET_LOADING, SET_SELECTED_COLUMN } from '../actionType'

const initialState = {
    loading: false,
    board: []
}

export function boardReducer (state = initialState, action) {
    if (action.type === SET_LOADING) {
        return { ...state, loading: action.payload }
    }

    if (action.type === SET_SELECTED_COLUMN) {
        const newBoard = state.board.map((row, rowIndex) => row.map((col, colIndex) => {
            if (rowIndex === action.payload.row && colIndex === action.payload.col) {
                return action.payload.value;
            }
            
            return col;
        }));
        return { ...state, board: newBoard  }
    }
    
    if (action.type === SET_BOARD) {
        console.log(action.payload, 'INI DARI REDUCER')
        return {...state, board: action.payload}
    }
    return state
}