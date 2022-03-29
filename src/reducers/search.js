import * as types from '../constants/ActionTypes';  // import toan bo voi ten la types

var initialState = '';  // khoi tao la false la close form

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SEARCH:
            state = action.keyword;
            return state;  // return ra state
        
        default: 
            return state;
    }  
};

export default myReducer;