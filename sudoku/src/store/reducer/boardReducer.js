import { 
    SET_BOARD, 
    SET_LOADING, 
    SET_SELECTED_COLUMN, 
    SET_LEADER_BOARD, 
    CHECK_BOARD, 
    SET_STATUS 
} from '../actionType'

const initialState = {
    loading: false,
    board: [],
    leaderBoard: [],
    checkBoard: [],
    statusGame: false
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

    if (action.type === SET_LEADER_BOARD) {
        let newLeaderBoard = state.leaderBoard.concat(action.payload)
        return { ... state, leaderBoard: newLeaderBoard}
    }
    
    if (action.type === SET_BOARD) {
        return {...state, board: action.payload}
    }

    if (action.type === CHECK_BOARD) {
        const newBoard = action.payload.map((item, i) => 
        item.map((res, j) => {
            if (res) return true
            else return false
        }))
        return {...state, checkBoard: newBoard}
    }

    if (action.type === SET_STATUS) {
        return { ...state, statusGame: action.payload }
    }

    return state
}