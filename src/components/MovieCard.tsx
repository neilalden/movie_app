import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { BACKDROP_ENDPOINT, get, } from '../services/api'
import { ROUTES } from '../common/routes'
import { useNavigation } from '@react-navigation/native'
import Gap from './Gap'
import FastImage from 'react-native-fast-image'
import { MovieType } from '../common/types'
import { trunc } from '../common/utils'
type Props = {
    movie: MovieType,
    showDetails?: boolean,
    containerStyle?: StyleProp<ViewStyle>;
}
const MovieCard = (props: Props) => {
    const { movie, showDetails = false, containerStyle } = props;
    const image = movie.backdrop_path ?? movie.poster_path;
    const navigation: any = useNavigation()
    const handlePress = () => {
        navigation.navigate(ROUTES.MOVIE_DETAILS_SCREEN, { movie })
    }

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.container, containerStyle]}>
            {
                showDetails ?
                    <View style={styles.detailsContainer}>
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: `${BACKDROP_ENDPOINT}${image}`,
                                cache: FastImage.cacheControl.immutable,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                        <Gap width={5} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.detailsTitle}>{trunc(movie.title, 15)}</Text>
                            <Text style={styles.detailsDetails}>{trunc(movie.overview, 50)}</Text>
                        </View>
                    </View>
                    :
                    <>
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: `${BACKDROP_ENDPOINT}${image}`,
                                cache: FastImage.cacheControl.immutable,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text style={styles.title}>{trunc(movie.title)}</Text>
                    </>
            }
        </TouchableOpacity>
    )
}

export default memo(MovieCard)

const styles = StyleSheet.create({
    container: {
    },
    image: {
        height: 85,
        width: 150,
        backgroundColor: "gray"
    },
    title: {
        color: "black"
    },
    detailsContainer: {
        flexDirection: "row",
    },
    detailsTitle: {
        fontSize: 18,
        color: "black"
    },
    detailsDetails: {
        flex: 1,
        flexWrap: "wrap",
        color: "black",
    }
})