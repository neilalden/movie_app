import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { ArgFunction, VoidFunction } from '../common/types'
import { images } from '../common/images';
type Props = {
    onPress?: ArgFunction | VoidFunction;
    source?: ImageSourcePropType;
    imageStyle?: ImageStyle;
    containerStyle?: StyleProp<ViewStyle>;
    size?: number
}
const Icon = (props: Props) => {
    const source = props?.source ?? images.ic_user;
    const size = props?.size ?? 25;
    const imageStyle = props?.imageStyle;
    const containerStyle = props?.containerStyle;
    const onPress = props?.onPress;

    return (
        <TouchableOpacity
            disabled={!onPress}
            onPress={onPress}
            style={[containerStyle, { height: size, width: size }]}>
            <Image
                source={source}
                style={[imageStyle, styles.icon, { height: size, width: size }]}
            />
        </TouchableOpacity>
    );
};

export default Icon;

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});
