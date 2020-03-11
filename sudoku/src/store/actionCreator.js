import { SET_LOADING, SET_BOARD, SET_BACKUPBOARD, SET_SELECTED_COLUMN } from "./actionType"
import Axios from "axios"

export const setLoading = (value) => {
    return {
        type: SET_LOADING,
        payload: value
    }
}

export const setSelectedColumn = (value, row, col) => {
    return {
        type: SET_SELECTED_COLUMN,
        payload: { value, row, col }
    };
}

export const setBoard = (value) => {
    console.log(value, 'ini dari creator')
    return {
        type: SET_BOARD,
        payload: value
    }
}

export const setBackUpBoard = (value) => {
    // dimaksudkan menghindari references
    const result = []
    value.forEach(elem => {
        result.push(elem.slice())
    });
    return {
        type: SET_BACKUPBOARD,
        payload: result
    }
}

export const getBoard = () => {
    return function (dispatch) {
        dispatch(setLoading(true))
        Axios.get('https://sugoku.herokuapp.com/board?difficulty=easy')
            .then(({ data }) => {
                // dimaksudkan menghindari references
                const value2 = []
                data.board.forEach(elem => {
                    value2.push(elem.slice())
                });
                dispatch(setBoard(data.board))
                dispatch(setBackUpBoard(value2))
            })
            .catch(err => console.log(err))
            .finally(err => dispatch(setLoading(false)))
    }
}