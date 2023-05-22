import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArgFunction, VoidFunction } from '../common/types'
import { images } from '../common/images'
import Icon from './Icon'
type Props = {
    rating: number,
    setRating?: ArgFunction | VoidFunction
}
const Rating = (props: Props) => {
    const { rating, setRating } = props
    return (
        <View style={styles.container}>
            {Array(10).fill(0).map((_, i) => <Icon source={i >= Math.round(rating) ? images.ic_star_outline : images.ic_star} key={i} onPress={setRating ? () => setRating(i + 1) : undefined} />)}
        </View>
    )
}

export default Rating

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",

    }
})