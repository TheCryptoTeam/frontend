import { combineReducers, createStore } from "redux";

import loginReducer from "./login";
import hotelsReducer from "./hotels";
import citiesReducer from "./cities";
import wishListReducer from "./wishLish";


// import wishListsReducer from "./wishLists";
import usersReducer from "./users/users";

const reducers = combineReducers({ loginReducer,hotelsReducer,usersReducer,citiesReducer,wishListReducer });

const store = createStore(reducers);

export default store;