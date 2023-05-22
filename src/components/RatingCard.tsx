import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RatingType } from '../common/types'
import { trunc } from '../common/utils'
import FastImage from 'react-native-fast-image'
import Gap from './Gap'
type Props = {
    rating: RatingType
}
const RatingCard = (props: Props) => {
    const { rating } = props;
    const [expand, setExpand] = useState(false);
    const formatAuthorImage = () => {
        const avatarEndpoint = "https://secure.gravatar.com/avatar"
        const url = rating.author_details.avatar_path?.replace(avatarEndpoint, "");
        return avatarEndpoint + url?.replace("//", "/");

    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => setExpand(prev => !prev)}>
            <View style={styles.row}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: formatAuthorImage(),
                        cache: FastImage.cacheControl.immutable,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Gap width={10} />
                <View>
                    <Text style={styles.title}>{rating.author}</Text>
                    <Text style={styles.title}>{new Date(rating?.created_at ?? new Date()).toLocaleDateString()}</Text>
                </View>
            </View>
            <Gap height={10} />
            <Text style={styles.content}>{expand ? rating.content : trunc(rating.content, 200)}</Text>
        </TouchableOpacity>
    )
}

export default RatingCard

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        minWidth: 100,
        maxWidth: 300,
        minHeight: 175,
        alignSelf: 'flex-start'
    },
    row: {
        flexDirection: "row"
    },
    image: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        backgroundColor: "gray"
    },
    title: {
        color: "black",
        fontSize: 16,
    },
    content: {
        color: "black",
        textAlign: "justify"
    }
})