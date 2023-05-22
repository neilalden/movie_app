import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
type Props = {
    height?: number;
    width?: number
}
const Gap = (props: Props) => {
    const { height = 0, width = 0 } = props;
    return (
        <View style={{ height, width }} />
    )
}

export default Gap