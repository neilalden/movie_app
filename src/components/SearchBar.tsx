import { Image, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { images } from '../common/images';
import { ArgFunction } from '../common/types';
type Props = {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>> | ArgFunction;
    containerStyle?: StyleProp<ViewStyle>;
}
const SearchBar = (props: Props) => {
    const { state, setState, containerStyle } = props
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={[styles.container, containerStyle]}>
            {!isFocused ? <Image source={images.ic_search} style={styles.image} /> : <></>}
            <TextInput value={isFocused ? state : ""} onChangeText={(text) => setState(text)} style={styles.textInput} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
    },
    image: {
        height: 25,
        left: -20,
        resizeMode: "contain",
        position: "absolute"
    },
    textInput: {
        flex: 1,
        height: 30,
        padding: 0,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        color: "black"
    }
})