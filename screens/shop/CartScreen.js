import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'

import Color from '../../constants/Color'
import CartItem from '../../components/shop/CartItem'

import * as cartAction from '../../store/action/cart'
import * as orderAction from '../../store/action/order'

const CartScreen = ({ navigation }) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'Your Cart',
		})
	}, [navigation])

	const dispatch = useDispatch()
	const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
	const cartItems = useSelector((state) => {
		const transformedCartItem = []
		for (const key in state.cart.items) {
			transformedCartItem.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				quantity: state.cart.items[key].quantity,
				sum: state.cart.items[key].sum,
			})
		}
		return transformedCartItem.sort((a, b) =>
			a.productId > b.productId ? 1 : -1
		)
	})

	return (
		<View style={styles.screen}>
			<View style={styles.summary}>
				<Text style={styles.summaryText}>
					Total:
					<Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
				</Text>
				<Button
					disabled={cartItems.length === 0}
					color={Color.accent}
					title="Order Now"
					onPress={() =>
						dispatch(orderAction.addOrder(cartItems, cartTotalAmount))
					}
				/>
			</View>
			<FlatList
				data={cartItems}
				keyExtractor={(item) => item.productId}
				renderItem={({ item }) => (
					<CartItem
						item={item}
						onRemoveCart={() =>
							dispatch(cartAction.removeFromCart(item.productId))
						}
					/>
				)}
			/>
		</View>
	)
}
// pt-sans
const styles = StyleSheet.create({
	screen: {
		margin: 20,
	},
	summary: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		padding: 10,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
	},
	summaryText: {
		fontFamily: 'salbo-regular',
		fontSize: 18,
	},
	amount: {
		fontFamily: 'pt-sans',
		color: Color.primary,
	},
})

export default CartScreen
