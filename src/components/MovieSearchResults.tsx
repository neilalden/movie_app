import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import MovieCard from './MovieCard'
import Gap from './Gap'
import { MovieType } from '../common/types'
type Props = {
    searchResults: MovieType[]
}
const MovieSearchResults = (props: Props) => {
    const { searchResults } = props
    return (
        <>
            <Gap height={20} />
            {
                searchResults.map((movie) => {
                    return <Fragment key={movie.id}><Gap height={10} /><MovieCard key={movie.id} movie={movie} showDetails /></Fragment>
                })
            }
        </>
    )
}

export default MovieSearchResults

const styles = StyleSheet.create({})