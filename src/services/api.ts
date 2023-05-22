import { MovieType } from "../common/types";
import { AccountType } from "./redux/slice/account";
import { GenreType } from "./redux/slice/movies";
export const API_KEY = 'f1b527400886d59a22abc77aa3c79ae4';
export const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWI1Mjc0MDA4ODZkNTlhMjJhYmM3N2FhM2M3OWFlNCIsInN1YiI6IjY0NjRlOTFhMDI4NDIwMDBmY2JlNDQ3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s0nIRWvZkJDApcfA2LB5V-bTxdUNfv5pGcWw42PWN0Y'
export const BACKDROP_ENDPOINT = "https://image.tmdb.org/t/p/original"
export const GENRE_LIST_ENDPOINT = 'https://api.themoviedb.org/3/genre/movie/list'
export const GET_REQUEST_TOKEN = 'https://api.themoviedb.org/3/authentication/token/new';
export const LOGIN_ENDPOINT = 'https://api.themoviedb.org/3/authentication/token/validate_with_login'

export const MOVIE_ENDPOINT = (movieId: MovieType["id"]) => `https://api.themoviedb.org/3/movie/${movieId}`
export const MOVIE_WITH_API_KEY_ENDPOINT = (movieId: MovieType["id"]) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
export const MOVIE_WITH_SESSION_ID_ENDPOINT = (movieId: MovieType["id"], sessionId: string) => `https://api.themoviedb.org/3/movie/${movieId}?session_id=${sessionId}`
export const ADD_TO_WATCHLIST_ENDPOINT = (movieId: MovieType["id"]) => `https://api.themoviedb.org/3/account/${movieId}/watchlist`
export const GET_RATED_MOVIES_ENDPOINT = (accountId: AccountType["username"], language: string = "en-US", page: number = 1, sortBy: string = "created_at.asc") => `'https://api.themoviedb.org/3/account/${accountId}/rated/movies?language=${language}&page=${page}&sort_by=${sortBy}`
export const GET_WATCHLIST_ENDPOINT = (language: string = 'en-US', sortBy: string = "created_at.asc") => `https://api.themoviedb.org/3/account/neilalden/watchlist/movies?language=${language}&page=1&sort_by=${sortBy}`
export const GET_TRENDING_MOVIES_ENDPOINT = (language: string = "en-US", page: number = 1) => `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`
export const GET_MOVIE_IMAGE_ENDPOINT = (movieId: MovieType["id"]) => `https://api.themoviedb.org/3/movie/${movieId}/images`
export const GET_MOVIE_RATINGS_ENDPOINT = (movieId: MovieType["id"], language: string = "en-US", page: number = 1) => `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=${language}&page=${page}`
export const SEARCH_BY_TITLE_ENDPOINT = (queryString: string) => `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${queryString}`
export const SEARCH_BY_GENRE_ENDPOINT = (genreId: GenreType["id"] = 0, language: string = "en-US", page: number = 1) => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`


export const get = (url = 'https://api.themoviedb.org') => {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
        }
    }
    return fetch(url, options)
        .then(function (res) {
            return res.json();
        })
        .then(function (resJson) {
            return resJson;
        })
}
export const post = (url = 'https://api.themoviedb.org', payload = {}) => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload)
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(error => console.error(error));
}

export const Delete = (url = 'https://api.themoviedb.org', payload = {}) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload)
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(error => console.error(error));
}