import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	View,
	Text,
	FlatList,
	Button,
	ActivityIndicator,
	StyleSheet,
} from 'react-native'

// Components
import Color from '../../constants/Color'
import CartItem from '../../components/shop/CartItem'
import Card from '../../components/UI/Card'
// Actions
import * as cartAction from '../../store/action/cart'
import * as orderAction from '../../store/action/order'

const CartScreen = ({ navigation }) => {
	// State
	const [isOrderLoading, setIsOrderLoading] = useState(false)

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

	// Order Click
	const sendOrderHandler = useCallback(async () => {
		setIsOrderLoading(true)
		await dispatch(orderAction.addOrder(cartItems, cartTotalAmount))
		setIsOrderLoading(false)
	}, [cartItems, cartTotalAmount])

	return (
		<View style={styles.screen}>
			<Card style={styles.summary}>
				<Text style={styles.summaryText}>
					Total:
					<Text style={styles.amount}>
						${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
					</Text>
				</Text>
				{isOrderLoading ? (
					<ActivityIndicator size="small" color={Color.primary} />
				) : (
					<Button
						disabled={cartItems.length === 0}
						color={Color.accent}
						title="Order Now"
						onPress={sendOrderHandler}
					/>
				)}
			</Card>
			<FlatList
				data={cartItems}
				keyExtractor={(item) => item.productId}
				renderItem={({ item }) => (
					<CartItem
						item={item}
						onRemoveCart={() =>
							dispatch(cartAction.removeFromCart(item.productId))
						}
						deletable
					/>
				)}
			/>
		</View>
	)
}
// Styles
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
