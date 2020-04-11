import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CartItem = (props) => {
	const { item } = props
	return (
		<View>
			<Text> {item.productTitle} </Text>
		</View>
	)
}

const styles = StyleSheet.create({})

export default CartItem
