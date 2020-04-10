import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

// Navigatior
import ShopNavigator from './navigation/ShopNavigator'

// Reducers
import productReducer from './store/reducer/product'

// Redux And Reducer
const rootReducer = combineReducers({
	products: productReducer,
})

const store = createStore(rootReducer)

export default function App() {
	return (
		<Provider store={store}>
			<ShopNavigator />
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
