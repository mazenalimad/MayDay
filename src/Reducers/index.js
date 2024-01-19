import {combineReducers, createStore} from "redux";
import AppReducer from "./AppReducer";
import ShazamReducer from "./ShazamReducer";
import SongDetailReducer from "./SoundDetailReducer";

export const Reducers = combineReducers({
    app: AppReducer,
    shazam: ShazamReducer,
    songDetails: SongDetailReducer
})

export const store = createStore(Reducers, {});
