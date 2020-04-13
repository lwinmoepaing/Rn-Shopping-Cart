import React from 'react'
import { useSelector } from 'react-redux'
import { FlatList, Button, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

// Theme
import Color from '../../constants/Color'

// Components
import CustomHeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'

const UserProductScreen = ({ navigation }) => {
	// Navigation Setup
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'Your Products',
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

	const userProducts = useSelector((state) => state.products.userProducts)

	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<ProductItem product={item} onSelect={() => {}}>
					<Button color={Color.primary} title="Edit" onPress={() => {}} />
					<Button color={Color.primary} title="Delete" onPress={() => {}} />
				</ProductItem>
			)}
		/>
	)
}

export default UserProductScreen
