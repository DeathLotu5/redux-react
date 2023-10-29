const redux = require('redux');
const reduxLogger = require('redux-logger');

const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREAM = "BUY_ICE_CREAM";
const initialIceCreamState = {
    numberOfIceCream: 20
}

const initialCakeState = {
    numberOfCake: 10
}
const createStore = redux.createStore;
const logger = reduxLogger.createLogger();
const combineReducers =  redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware;

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "Buy Cake"
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
        info: "Buy Ice Cream"
    }
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numberOfCake: state.numberOfCake - 1
            };
        default: 
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICE_CREAM:
            return {
                ...state,
                numberOfIceCream: state.numberOfIceCream - 1
            };
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

const store = createStore(rootReducer, applyMiddleWare(logger));
console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe()
