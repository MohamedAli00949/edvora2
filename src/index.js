import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, compose } from 'redux';

import reducer from "./reducers";
import middleware from "./middleware";

import App from './App';

const myStore = createStore(reducer, compose(middleware));

const root = createRoot(document.getElementById('root'));

root.render(<Provider store={myStore}><App /></Provider>);