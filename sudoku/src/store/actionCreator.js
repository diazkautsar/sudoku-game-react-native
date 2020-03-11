import { 
    SET_LOADING, 
    SET_BOARD, 
    SET_BACKUPBOARD, 
    SET_SELECTED_COLUMN, 
    SET_LEADER_BOARD, 
    CHECK_BOARD, 
    SET_STATUS
} from "./actionType"
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

// berisi array true/false untuk membuat user bisa edit setelah submit
export const checkBoard = (value) => {
    // dimaksudkan menghindari references
    const result = []
    value.forEach(elem => {
        result.push(elem.slice())
    });
    return {
        type: CHECK_BOARD,
        payload: result
    }
}

export const getBoard = (level) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        Axios.get('https://sugoku.herokuapp.com/board?difficulty=' + level)
            .then(({ data }) => {
                // dimaksudkan menghindari references
                const value2 = []
                data.board.forEach(elem => {
                    value2.push(elem.slice())
                });
                const value3 = []
                data.board.forEach(elem => {
                    value3.push(elem.slice())
                });
                dispatch(setBoard(data.board))
                dispatch(setBackUpBoard(value2))
                dispatch(checkBoard(value3))
                dispatch(setStatusGame(false))
            })
            .catch(err => console.log(err))
            .finally(err => dispatch(setLoading(false)))
    }
}

export const setLeaderBoard = (value) => {
    return {
        type: SET_LEADER_BOARD,
        payload: value
    }
}

export const setStatusGame = (value) => {
    return {
        type: SET_STATUS,
        payload: value
    }
}

const encodeBoard = (board) => board.reduce((result, row, i) =>
    result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
    Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');

export const getAnswerSudoku = (backUpBoard) => {
    return function (dispatch) {
        Axios.post('https://sugoku.herokuapp.com/solve', encodeParams({ board: backUpBoard }))
            .then(({ data }) => {
                dispatch(setBoard(data.solution))
                dispatch(setStatusGame(true))
            })
            .catch(err => console.log(err))
    }
}