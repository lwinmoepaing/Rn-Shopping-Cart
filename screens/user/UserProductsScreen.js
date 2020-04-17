import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	FlatList,
	Button,
	Platform,
	Alert,
	StyleSheet,
	View,
	Text,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

// Theme
import Color from '../../constants/Color'

// Actions
import * as productActions from '../../store/action/product'

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
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title="Menu"
						onPress={() => navigation.navigate('EditProduct')}
						iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					/>
				</HeaderButtons>
			),
		})
	}, [navigation])

	const dispatch = useDispatch()
	const userProducts = useSelector((state) => state.products.userProducts)

	const toEditScreen = (id) => {
		navigation.navigate('EditProduct', {
			productId: id,
		})
	}

	const deleteHandler = (id) => {
		Alert.alert('Are you sure?', 'Do you really want to delete this item.!', [
			{
				text: 'No',
				style: 'default',
			},
			{
				text: 'Yes',
				style: 'destructive',
				onPress: () => dispatch(productActions.deleteProduct(id)),
			},
		])
	}

	if (userProducts.length === 0) {
		return (
			<View style={styles.centered}>
				<Text> No Product Found. May be Create Some.</Text>
			</View>
		)
	}

	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<ProductItem product={item} onSelect={() => toEditScreen(item.id)}>
					<Button
						color={Color.primary}
						title="Edit"
						onPress={() => toEditScreen(item.id)}
					/>
					<Button
						color={Color.primary}
						title="Delete"
						onPress={() => deleteHandler(item.id)}
					/>
				</ProductItem>
			)}
		/>
	)
}

// Styles
const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default UserProductScreen
