import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import Color from '../../constants/Color'
import CartItem from './CartItem'

const OrderItem = (props) => {
	const [showDetails, setShowDetails] = useState(false)
	return (
		<View style={styles.orderItem}>
			<View style={styles.summary}>
				<Text style={styles.amount}> {props.amount.toFixed(2)} </Text>
				<Text style={styles.date}> {props.date} </Text>
			</View>
			<Button
				color={Color.primary}
				title={showDetails ? 'Hide Details' : 'Show Details'}
				onPress={() => {
					setShowDetails((prevState) => !prevState)
				}}
			/>
			{showDetails && (
				<View>
					{props.items.map((item) => (
						<CartItem item={item} key={item.productId} />
					))}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	orderItem: {
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
		margin: 20,
		padding: 10,
	},
	summary: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginBottom: 10,
	},
	amount: {
		fontFamily: 'pt-sans',
		fontSize: 16,
	},
	date: {
		fontSize: 16,
		fontFamily: 'pt-sans',
		color: '#888888',
	},
})

export default OrderItem
