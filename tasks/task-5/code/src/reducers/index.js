import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// calling the default reducer to create a link
import defaultReducer from './default-reducer';

const rootReducers = combineReducers({
    // add reducer files references here
    default: defaultReducer,
    form: formReducer
});

export default rootReducers;