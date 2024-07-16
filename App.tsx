import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store/store'
import TodoScreen from './src/screens/TodoScreen'

const App = () => {
    return (
        <Provider store={store}>
            <TodoScreen />
        </Provider>
    )
}

export default App
