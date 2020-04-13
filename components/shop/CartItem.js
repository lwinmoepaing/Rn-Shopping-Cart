import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Color from '../../constants/Color'

const CartItem = (props) => {
	const { item } = props
	return (
		<View style={styles.cartItem}>
			<View style={styles.itemData}>
				<Text style={styles.quantity}> {item.quantity} </Text>
				<Text style={styles.mainText}> {item.productTitle} </Text>
			</View>
			<View style={styles.itemData}>
				<Text style={styles.mainText}> ${item.sum.toFixed(2)} </Text>

				{props.deletable && (
					<TouchableOpacity
						onPress={props.onRemoveCart}
						style={styles.deleteButton}
					>
						<Ionicons
							name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
							size={23}
							color={Color.primary}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cartItem: {
		padding: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// marginHorizontal: 20,
	},
	itemData: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	quantity: {
		fontFamily: 'pt-sans',
		color: '#888',
		fontSize: 16,
	},
	mainText: {
		fontFamily: 'pt-sans',
		fontSize: 16,
	},
	deleteButton: {
		marginLeft: 20,
	},
})

export default CartItem
