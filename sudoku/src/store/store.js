import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {boardReducer} from './reducer/boardReducer'
import { backUpBoardReducer } from './reducer/backUpBoardReducer' 

export default createStore(
    combineReducers({
        boardReducer,
        backUpBoardReducer
    }),
    applyMiddleware(
        thunk
    )
)