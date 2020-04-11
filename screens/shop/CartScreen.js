import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'

const CartScreen = () => {
	const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
	return (
		<View style={styles.screen}>
			<View style={styles.summary}>
				<Text style={styles.summaryText}>
					Total: <Text style={styles.amount}>{cartTotalAmount}</Text>
				</Text>
				<Button title="Order Now" onPress={() => {}} />
			</View>
			<View>
				<Text> Cart Items </Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		margin: 20,
	},
	summary: {},
	summaryText: {},
	amount: {},
})

export default CartScreen
