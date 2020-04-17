import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	View,
	FlatList,
	Platform,
	StyleSheet,
	ActivityIndicator,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Color from '../../constants/Color'

import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

import * as orderActions from '../../store/action/order'

const OrderScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(true)

	const dispatch = useDispatch()
	const orders = useSelector((state) => state.orders.orders)

	const loadData = useCallback(async () => {
		setIsLoading(true)
		await dispatch(orderActions.setOrder())
		setIsLoading(false)
	}, [dispatch])

	useEffect(() => {
		loadData()
	}, [dispatch, loadData])

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

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Color.primary} />
			</View>
		)
	}

	return (
		<FlatList
			data={orders}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<OrderItem
					amount={itemData.item.totalAmount}
					date={itemData.item.readableDate}
					items={itemData.item.items}
				/>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default OrderScreen
