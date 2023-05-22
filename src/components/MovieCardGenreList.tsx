import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useEffect } from 'react'
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../services/redux/type';
import Gap from './Gap';

const MovieCardGenreList = () => {
    const displayedMovies = new Set() // to prevent displaying the same movie twice 
    const movieGenreObj = useSelector((state: StateType) => state.Movies.movieGenreObj);
    if (!movieGenreObj) return null;
    return (
        <>
            {
                Object.keys(movieGenreObj)?.map((genre) => {
                    return (
                        <View key={genre}>
                            <Gap height={20} />
                            <Text style={styles.title}>{genre}</Text>
                            <ScrollView horizontal>
                                {movieGenreObj[genre].map((movie) => {
                                    if (displayedMovies.has(movie.title)) return null;
                                    displayedMovies.add(movie.title)
                                    return (
                                        <Fragment key={movie.id}>
                                            <MovieCard movie={movie} />
                                            <Gap width={5} />
                                        </Fragment>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    )
                })
            }
        </>
    )
}

export default MovieCardGenreList

const styles = StyleSheet.create({
    title: {
        color: "black",
        fontSize: 22
    }
})