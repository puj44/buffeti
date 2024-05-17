import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import { watcherSaga } from "./saga/rootSaga";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  // Create the middleware
  const saga = createSagaMiddleware();

  // create store with middleware:
  const store = configureStore({
    reducer:{
        ...rootReducer
    },
    middleware:(getDefaultMiddleware)=> 
        getDefaultMiddleware({thunk:false}).concat(saga)
  });

  // Run sagas on server
  store.sagaTask = saga.run(watcherSaga);

  // return the store:
  return store;
};
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NEXT_PUBLIC_IS_DEBUG ?? false, serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state)
});
export const store = makeStore();
