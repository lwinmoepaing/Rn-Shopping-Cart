import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'

// Navigatior
import ShopNavigator from './navigation/ShopNavigator'

// Reducers
import productReducer from './store/reducer/product'

// Redux And Reducer
const rootReducer = combineReducers({
	products: productReducer,
})

const store = createStore(rootReducer)

const fetchFonts = () => {
	return Font.loadAsync({
		'salbo-regular': require('./assets/fonts/Slabo-Regular.ttf'),
		'pt-sans': require('./assets/fonts/PTSans-Regular.ttf'),
	})
}

export default function App() {
	const [fontLoaded, setFontLoad] = useState(false)

	if (!fontLoaded) {
		return (
			<AppLoading startAsync={fetchFonts} onFinish={() => setFontLoad(true)} />
		)
	}

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
