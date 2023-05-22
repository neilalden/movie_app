import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { images } from '../common/images'
import Gap from '../components/Gap'
import Icon from '../components/Icon'
import { ROUTES } from '../common/routes'
import { BACKDROP_ENDPOINT, post } from '../services/api'
import { MovieType } from '../common/types'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../services/redux/type'
import { getMovieRatings } from '../services/redux/slice/movies'
import RatingCard from '../components/RatingCard'
import account, { addMovieRating, addToWatchlist, deleteMovieRating, getWatchList } from '../services/redux/slice/account'
type Props = {
    route: {
        params: { movie: MovieType }
    }
    navigation: any
}
const MovieDetailsScreen = (props: Props) => {
    const { route, navigation } = props;
    const movie = route.params.movie;
    const dispatch = useDispatch();
    const request_token = useSelector((state: StateType) => state.Account.account?.request_token);
    const ratings = useSelector((state: StateType) => state.Movies.movieRatingsObj);
    const watchlist = useSelector((state: StateType) => state.Account.account?.watchlist);
    const ratedMovieList: Array<MovieType> | undefined = useSelector((state: StateType) => state.Account.account?.ratedMovieList);
    const [rating, setRating] = useState<number>(0)

    const foundWatchList = watchlist?.find((wMovie) => wMovie.id === movie.id);
    const foundRatedMovieList = ratedMovieList?.find((wMovie) => wMovie.id === movie.id);

    const handleSubmit = async () => {
        if (!rating) return;
        if (!request_token) return navigation.navigate(ROUTES.ACCOUNT_SCREEN)
        if (foundRatedMovieList)
            Alert.alert("Confirm?", `Delete your rating of ${foundRatedMovieList.rating}/10 for this movie?`, [
                {
                    text: 'YES', onPress: () => dispatch(deleteMovieRating({
                        movieId: movie.id,
                    }))
                },
                { text: 'NO', onPress: () => true },
            ])
        else
            Alert.alert("Confirm?", `Rate this movie ${rating}/10?`, [
                {
                    text: 'YES', onPress: () => dispatch(addMovieRating({
                        movieId: movie.id, value: rating
                    }))
                },
                { text: 'NO', onPress: () => true },
            ])
    }
    const handleBookmark = () => {
        if (foundWatchList) return Alert.alert("Remove feat not available") // seems like there's no remove bookmark feat in the api yet
        if (!request_token) return navigation.navigate(ROUTES.ACCOUNT_SCREEN)
        else dispatch(addToWatchlist({
            media_type: "movie",
            media_id: movie.id,
            watchlist: true
        })).then((res) => dispatch(getWatchList()))
    }
    const handleNavigateToAccount = () => navigation.navigate(ROUTES.ACCOUNT_SCREEN)
    const goBack = () => {
        navigation.goBack()
    }
    useEffect(() => {
        if (ratings && ratings[movie.id] && ratings[movie.id].length > 0) return;
        dispatch(getMovieRatings(movie.id));
    }, [])
    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView>
                <View style={styles.header}>
                    <Icon onPress={goBack} source={images.ic_back} />
                    <Icon onPress={handleNavigateToAccount} source={images.ic_user} />
                </View>
                <Image source={{ uri: `${BACKDROP_ENDPOINT}${movie.backdrop_path}` }} style={styles.banner} />
                <View style={styles.container}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <View style={styles.row}>
                        <Rating rating={movie.vote_average} />
                        <Icon onPress={handleBookmark} source={foundWatchList ? images.ic_bookmark_remove : images.ic_bookmark_add} />
                    </View>
                    <Gap height={20} />
                    <Text style={styles.desc}>{movie.overview}</Text>
                </View>
                <ScrollView horizontal style={styles.screen}>
                    {ratings && ratings[movie.id] && ratings[movie.id].map((rating, i) => <RatingCard rating={rating} key={i} />)}
                </ScrollView>
                <Gap height={20} />
                <View style={styles.personalRatingContainer}>
                    <Text style={styles.title}>{foundRatedMovieList ? "You rated this movie" : "Rate this movie?"}</Text>
                    <Gap height={5} />
                    <Rating rating={foundRatedMovieList ? foundRatedMovieList.rating : rating} setRating={foundRatedMovieList ? undefined : setRating} />
                    <Gap height={15} />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>{foundRatedMovieList ? "Delete rating" : "Submit"}</Text>
                    </TouchableOpacity>
                </View>
                <Gap height={20} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default MovieDetailsScreen

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#E0EBEB",
        flex: 1,
    },
    header: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    banner: {
        width: "100%",
        height: 200,
        resizeMode: "cover"
    },
    container: {
        padding: 15
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        color: "black",
        fontSize: 22
    },
    desc: {
        color: "black",
        textAlign: "justify"
    },
    button: {
        alignSelf: "center",
        borderRadius: 5,
        backgroundColor: "black"
    }, buttonText: {
        color: "white",
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    personalRatingContainer: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black",
        alignItems: "center"
    }
})