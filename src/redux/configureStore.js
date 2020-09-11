import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import { IntialFeedback } from './forms';


export const ConfigureStore= () =>{
    const store= createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions:Promotions,
            leaders: Leaders,
            ...createForms({
                feedback :IntialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}