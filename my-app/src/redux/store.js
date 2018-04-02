import { createStore } from 'redux';
import rootReduser from './reducer'

const store = createStore(
    rootReduser
);

export default store