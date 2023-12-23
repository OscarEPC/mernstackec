import { Provider } from 'react-redux';

import { MernStackEcRouter } from "./router/MernStackEcRouter";
import { store } from './store';

export const MernStackEcApp = () => {
    return (
        <Provider store={store}>
            <MernStackEcRouter />
        </Provider>
    )
}
