import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import QLTCScreen from './screens/QLTCScreen'

const AppQLTC = () => {
  return (
    <Provider store={store}>
      <QLTCScreen />
    </Provider>
  )
}

export default AppQLTC

const styles = StyleSheet.create({})