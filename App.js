import React, { useState } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'

// DevTools
import { composeWithDevTools } from 'redux-devtools-extension'

// Navigatior
import ShopNavigator from './navigation/ShopNavigator'

// Reducers
import productReducer from './store/reducer/product'
import cartReducer from './store/reducer/cart'
import orderReducer from './store/reducer/order'
import authReducer from './store/reducer/auth'

// Redux And Reducer
const rootReducer = combineReducers({
	products: productReducer,
	cart: cartReducer,
	orders: orderReducer,
	auth: authReducer,
})

// For Developing ,
// You Can Use --> createStore(rootReducer, composeWithDevTools())

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

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
