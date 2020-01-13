import * as actionTypes from '../actions/traffic';

const initialState = {
    fullData: []
}

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_FULLDATA:
            return {
                fullData: action.fullData
            }
        default:
            return state
    }
}

export default reducer;