import { combineReducers } from 'redux';

import user from './user';
import rides from './rides';

export default combineReducers({ user, rides });

