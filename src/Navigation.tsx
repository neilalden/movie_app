import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from './common/routes';
import { MovieListTypes } from './common/types';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import { getGenreList, getMovieListByGenre, getTrendingMovieList } from './services/redux/slice/movies';
import { StateType } from './services/redux/type';

const Stack = createStackNavigator();

const Navigation = () => {
    const dispatch = useDispatch();
    const genreList = useSelector((state: StateType) => state.Movies.genreList)
    const movieObj: any = useSelector((state: StateType) => state.Movies.movieObj)
    React.useEffect(() => {
        (async () => {
            if (movieObj && !movieObj[MovieListTypes.TRENDING]) dispatch(getTrendingMovieList())
            if (!genreList?.length) dispatch(getGenreList())
            if (!!genreList?.length) genreList.forEach(genre => dispatch(getMovieListByGenre(genre)))
        })();
    }, [genreList])
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={ROUTES.HOME_SCREEN}
                screenOptions={{
                    headerShown: false,
                    animationEnabled: false,
                }}>
                <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
                <Stack.Screen name={ROUTES.ACCOUNT_SCREEN} component={AccountScreen} />
                <Stack.Screen name={ROUTES.MOVIE_DETAILS_SCREEN} component={MovieDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
