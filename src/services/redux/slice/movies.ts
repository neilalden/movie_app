import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieListTypes, MovieType, RatingType } from "../../../common/types";
import { GENRE_LIST_ENDPOINT, get, GET_MOVIE_RATINGS_ENDPOINT, GET_TRENDING_MOVIES_ENDPOINT, MOVIE_ENDPOINT, post, SEARCH_BY_GENRE_ENDPOINT, SEARCH_BY_TITLE_ENDPOINT } from "../../api";

export type GenreType = {
    id: number
    name: string
}
export type MovieGenreObj = {
    genre: GenreType["name"];
    movieList: Array<MovieType>
}
export type MoviesStateType = {
    loading: boolean
    error?: string
    movieObj?: { [id: MovieType["id"]]: MovieType }
    genreList?: Array<GenreType>
    genreIdNameObj?: { [id: GenreType["id"]]: GenreType["name"] }
    movieGenreObj?: { [id: GenreType["name"]]: MovieGenreObj["movieList"] }
    movieRatingsObj?: {
        [id: MovieType["id"]]: Array<RatingType>
    }
    ratedMovies?: {
        [id: MovieType["id"]]: MovieType & { rating: number }
    }
}
const initialState: MoviesStateType = {
    loading: false,
    error: '',
    movieObj: undefined,
    genreList: undefined,
    genreIdNameObj: undefined,
    movieGenreObj: undefined
}

export const getGenreList = createAsyncThunk("movies/getGenreList", async () => {
    const response = await get(GENRE_LIST_ENDPOINT);
    return response["genres"].slice(0, 3) // load movies from 4 genres only because its too slow to load movies from all genres
});

export const getTrendingMovieList = createAsyncThunk("movies/getTrendingMovieList", async () => {
    const response = await get(GET_TRENDING_MOVIES_ENDPOINT());
    return { genre: MovieListTypes.TRENDING, movieList: response["results"] }
});

export const getMovieListByGenre = createAsyncThunk("movies/getMovieListByGenre", async (genre: GenreType) => {
    const { id, name } = genre
    const response = await get(SEARCH_BY_GENRE_ENDPOINT(id));
    return { genre: name, movieList: response["results"] }
});
export const getMovieRatings = createAsyncThunk("movies/getMovieRatings", async (movieId: MovieType["id"]) => {
    const response = await get(GET_MOVIE_RATINGS_ENDPOINT(movieId));
    return { id: movieId, reviews: response["results"] }
})
export const getMovieByTitle = async (titleQuery: string) => {
    return await get(SEARCH_BY_TITLE_ENDPOINT(titleQuery));
};

export const postMovieRating = createAsyncThunk("movies/postMovieRating", async ({ movie, data }: { movie: MovieType, data: { value: number } }) => {
    const response = await post(MOVIE_ENDPOINT(movie.id), data);
    return { movie, rating: data.value, response }
})

export const MoviessSlice = createSlice({
    name: "movies",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenreList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getGenreList.fulfilled, (state, action: PayloadAction<GenreType[]>) => {
            state.loading = false;
            state.genreList = action.payload
            action.payload.forEach((genre) => {
                state.genreIdNameObj = { ...state.genreIdNameObj, [genre.id]: genre.name }
            })
        })
        builder.addCase(getGenreList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        builder.addCase(getTrendingMovieList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getTrendingMovieList.fulfilled, (state, action: PayloadAction<MovieGenreObj>) => {
            const { genre, movieList } = action.payload
            state.loading = false;
            state.movieGenreObj = { [genre]: movieList, ...state.movieGenreObj }
            movieList.forEach((movie) => {
                state.movieObj = { ...state.movieObj, [movie.id]: movie }
            })
        })
        builder.addCase(getTrendingMovieList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        builder.addCase(getMovieListByGenre.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMovieListByGenre.fulfilled, (state, action: PayloadAction<MovieGenreObj>) => {
            const { genre, movieList } = action.payload
            state.loading = false;
            state.movieGenreObj = { ...state.movieGenreObj, [genre]: movieList }
            movieList.forEach((movie) => {
                state.movieObj = { ...state.movieObj, [movie.id]: movie }
            })
        })
        builder.addCase(getMovieListByGenre.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        builder.addCase(getMovieRatings.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMovieRatings.fulfilled, (state, action: PayloadAction<any>) => {
            const { id, reviews } = action.payload
            state.loading = false;
            state.movieRatingsObj = { ...state.movieRatingsObj, [id]: reviews }
        })
        builder.addCase(getMovieRatings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        builder.addCase(postMovieRating.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(postMovieRating.fulfilled, (state, action: PayloadAction<any>) => {
            const { movie, rating, response } = action.payload
            state.loading = false;
            state.ratedMovies = { ...state.ratedMovies, [movie.id]: { ...movie, rating } }
            if (response.status_code !== 1) state.error = action.payload.response.status_message

        })
        builder.addCase(postMovieRating.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    },
    reducers: {
        getGenres: (state, action: PayloadAction<any>) => {
            state.genreList = state.genreList
        },

    }
})

export const { getGenres } = MoviessSlice.actions

export default MoviessSlice.reducer