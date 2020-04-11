import React from 'react'
import { Platform } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Themes
import Color from '../constants/Color'
// Screens
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'

const Stack = createStackNavigator()
// Each Screen Options
const defaultNavigationOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Color.primary : '',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
	headerTitleStyle: {
		fontFamily: 'pt-sans',
	},
}

export default () => (
	<NavigationContainer>
		<Stack.Navigator screenOptions={defaultNavigationOptions}>
			<Stack.Screen name="ProductOverview" component={ProductsOverviewScreen} />
			<Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
			<Stack.Screen name="Cart" component={CartScreen} />
		</Stack.Navigator>
	</NavigationContainer>
)
