import React from 'react'
import {
	View,
	Text,
	Image,
	Button,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native'
import Color from '../../constants/Color'

const ProductItem = (props) => {
	const Touchable =
		Platform.OS === 'android' && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity
	const { product } = props

	return (
		<View style={styles.product}>
			<View style={styles.touchable}>
				<Touchable onPress={props.onViewDetail} useForeground>
					<View>
						<View style={styles.imageContainer}>
							<Image style={styles.image} source={{ uri: product.imageUrl }} />
						</View>

						<View style={styles.detailText}>
							<Text style={styles.title}> {product.title} </Text>
							<Text style={styles.price}> ${product.price.toFixed(2)} </Text>
						</View>

						<View style={styles.action}>
							<Button
								color={Color.primary}
								title="View Detail"
								onPress={props.onViewDetail}
							/>
							<Button
								color={Color.primary}
								title="To Cart"
								onPress={props.onAddToCart}
							/>
						</View>
					</View>
				</Touchable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	product: {
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
		height: 300,
		margin: 20,
	},
	detailText: {
		alignItems: 'center',
		height: '15%',
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
		height: '25%',
		paddingHorizontal: 20,
	},
	touchable: {
		borderRadius: 10,
		overflow: 'hidden',
	},
})

export default ProductItem
