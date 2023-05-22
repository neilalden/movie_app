import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/SearchBar'
import Icon from '../components/Icon'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../common/routes'
import MovieCardGenreList from '../components/MovieCardGenreList'
import { debounce } from '../common/utils'
import { API_KEY } from '../services/api'
import { getMovieByTitle } from '../services/redux/slice/movies'
import MovieSearchResults from '../components/MovieSearchResults'

const HomeScreen = (props: any) => {
    const navigation = props.navigation
    const [searchString, setSearchString] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const handleNavigateToAccount = () => navigation.navigate(ROUTES.ACCOUNT_SCREEN)
    const handleSearch = (text: string) => {
        setSearchString(text);
        debounce(async () => {
            if (searchString === "") return;
            const formatedText = searchString.replaceAll(" ", "+");
            const res = await getMovieByTitle(formatedText)
            setSearchResults(res.results)
        })();
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.row}>
                    <SearchBar state={searchString} setState={handleSearch} containerStyle={{ width: 200 }} />
                    <Icon onPress={handleNavigateToAccount} />
                </View>
                {searchResults && searchResults.length > 0 && searchString ? <MovieSearchResults searchResults={searchResults} /> : <MovieCardGenreList />}
            </SafeAreaView>
        </ScrollView>
    )

}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E0EBEB",
        flex: 1,
        padding: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        color: "black",
        fontSize: 22
    }
})