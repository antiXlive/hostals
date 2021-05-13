import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";

import configureStore from './src/state/configureStore';

const store = configureStore();

const hostals = () => (
    <Provider store={store}>
        <SafeAreaProvider>
            <App />
        </SafeAreaProvider>
    </Provider>
);

AppRegistry.registerComponent(appName, () => hostals);
