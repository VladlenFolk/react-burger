import { CHOOSE_BUN, CHOOSE_MAIN, CHOOSE_SAUCE} from "../actions/tab";

const defaultState = {
    typeIngredient: 'one',
}

export const tabReducer = (state = defaultState, action) => {
    switch (action.type){
        case CHOOSE_BUN: {
            return {...state, typeIngredient: 'one'}
        }
        case CHOOSE_SAUCE: {
            return {...state, typeIngredient: 'two'}
        }
        case CHOOSE_MAIN: {
            return {...state, typeIngredient: 'three'}
        }
        default: {
           return state
        }
    }
}