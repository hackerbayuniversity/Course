import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import userReducer from './user';

const rootReducers = combineReducers({
    form: formReducer.plugin({
	    websiteForm: (state, action) => {
	      switch(action.type) {
	        case 'ACCOUNT_SAVE_SUCCESS':
	          return undefined;
	        default:
	          return state;
	      }
	    }
	}),
    user: userReducer
});

export default rootReducers;