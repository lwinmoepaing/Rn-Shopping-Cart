import React from 'react'
import { Platform } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'

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
		backgroundColor: Platform.OS === 'android' ? Color.primary : 'white',
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

// Drawer Options
const drawerContentOptions = {
	activeTintColor: Color.primary,
}

const productDrawerConfig = {
	drawerIcon: (config) => (
		<Ionicons
			name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
			size={23}
			color={config.focused ? Color.primary : config.color}
		/>
	),
}

const orderDrawerConfig = {
	drawerIcon: (config) => (
		<Ionicons
			name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
			size={23}
			color={config.focused ? Color.primary : config.color}
		/>
	),
}

export default () => (
	<NavigationContainer>
		<Drawer.Navigator drawerContentOptions={drawerContentOptions}>
			<Drawer.Screen
				name="Product"
				component={ProductNavigator}
				options={productDrawerConfig}
			/>
			<Drawer.Screen
				name="Orders"
				component={OrderNavigator}
				options={orderDrawerConfig}
			/>
		</Drawer.Navigator>
	</NavigationContainer>
)
