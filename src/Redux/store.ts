import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'

import userReducer from './Reducers/userReducer'
import dataReducer from './Reducers/dataReducer'
import uiReducer from './Reducers/uiReducer'

const initialState={}
const middleware=[thunk]

const reducers=combineReducers({
    user:userReducer,
    data:dataReducer,
    UI:uiReducer
})

const store=createStore(reducers,initialState,compose(
            applyMiddleware(...middleware)
            ,(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
            ));

export default store;            