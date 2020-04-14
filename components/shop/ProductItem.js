import React from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native'

// Components
import Card from '../UI/Card'

const ProductItem = (props) => {
	const Touchable =
		Platform.OS === 'android' && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity
	const { product } = props

	return (
		<Card style={styles.product}>
			<View style={styles.touchable}>
				<Touchable onPress={props.onSelect} useForeground>
					<View>
						<View style={styles.imageContainer}>
							<Image style={styles.image} source={{ uri: product.imageUrl }} />
						</View>

						<View style={styles.detailText}>
							<Text style={styles.title}> {product.title} </Text>
							<Text style={styles.price}> ${product.price.toFixed(2)} </Text>
						</View>

						<View style={styles.action}>{props.children}</View>
					</View>
				</Touchable>
			</View>
		</Card>
	)
}

const styles = StyleSheet.create({
	product: {
		height: 300,
		margin: 20,
	},
	detailText: {
		alignItems: 'center',
		height: '17%',
	},
	imageContainer: {
		width: '100%',
		height: '60%',
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	title: {
		fontSize: 18,
		marginVertical: 4,
	},
	price: {
		fontSize: 14,
		color: '#888888',
	},
	action: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '23%',
		paddingHorizontal: 20,
	},
	touchable: {
		borderRadius: 10,
		overflow: 'hidden',
	},
})

export default ProductItem
