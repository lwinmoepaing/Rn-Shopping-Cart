import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, FlatList } from 'react-native'

const OrderScreen = () => {
	const orders = useSelector((state) => state.orders.orders)

	return (
		<FlatList
			data={orders.items}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => <Text> {itemData.item.totalAmount} </Text>}
		/>
	)
}

export default OrderScreen
