import { SET_BACKUPBOARD } from "../actionType"

const initialState = {
    // loading: false,
    backUpBoard: []
}

export function backUpBoardReducer (state = initialState, action) {
    if (action.type === SET_BACKUPBOARD) {
        return {...state, backUpBoard: action.payload}
    }
    return state
}