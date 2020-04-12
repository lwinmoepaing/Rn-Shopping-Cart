import React from 'react'
import { Platform } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

// Themes
import Color from '../constants/Color'
// Screens
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrderScreen from '../screens/shop/OrderScreen'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

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

const ProductNavigator = () => (
	<Stack.Navigator screenOptions={defaultNavigationOptions}>
		<Stack.Screen name="ProductOverview" component={ProductsOverviewScreen} />
		<Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
		<Stack.Screen name="Cart" component={CartScreen} />
	</Stack.Navigator>
)

const OrderNavigator = () => (
	<Stack.Navigator screenOptions={defaultNavigationOptions}>
		<Stack.Screen name="Orders" component={OrderScreen} />
	</Stack.Navigator>
)

export default () => (
	<NavigationContainer>
		<Drawer.Navigator>
			<Drawer.Screen name="Product" component={ProductNavigator} />
			<Drawer.Screen name="Orders" component={OrderNavigator} />
		</Drawer.Navigator>
	</NavigationContainer>
)
