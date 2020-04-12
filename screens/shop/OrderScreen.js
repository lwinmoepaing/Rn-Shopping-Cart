import React from 'react'
import { useSelector } from 'react-redux'
import { Text, FlatList, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/HeaderButton'

const OrderScreen = ({ navigation }) => {
	const orders = useSelector((state) => state.orders.orders)

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'Your Orders',
			headerLeft: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Menu"
						onPress={() => navigation.toggleDrawer()}
						iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					/>
				</HeaderButtons>
			),
		})
	}, [navigation])

	return (
		<FlatList
			data={orders}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => <Text> {itemData.item.totalAmount} </Text>}
		/>
	)
}

export default OrderScreen
