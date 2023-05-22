import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIResponseType, MovieType } from "../../../common/types";
import { ADD_TO_WATCHLIST_ENDPOINT, Delete, get, GET_MOVIE_RATINGS_ENDPOINT, GET_RATED_MOVIES_ENDPOINT, GET_REQUEST_TOKEN, GET_WATCHLIST_ENDPOINT, LOGIN_ENDPOINT, MOVIE_ENDPOINT, MOVIE_WITH_API_KEY_ENDPOINT, MOVIE_WITH_SESSION_ID_ENDPOINT, post } from "../../api";
export type AccountType = {
    username: string
    request_token: string
    watchlist: Array<MovieType>
    ratedMovieList: Array<MovieType>
}
export type RequestToken = {
    success: "success"
    expires_at: Date
    request_token: string
}
export type AccountStateType = {
    loading: boolean
    error?: string
    account?: AccountType
    requestToken?: RequestToken
}
export type WatchListType = {
    page: number,
    results: MovieType[]
    total_pages: number,
    total_results: number
}
const initialState: AccountStateType = {
    loading: false,
    error: '',
    account: undefined,
    requestToken: undefined
}

export const registerAccount = createAsyncThunk("account/registerAccount", async (data: any) => {

})

export const login = createAsyncThunk("account/login", async (data: { username: string, password: string, request_token: string }) => {
    const response = await post(LOGIN_ENDPOINT, data);
    return { username: data.username, request_token: response.request_token ?? data.request_token }

})

export const addToWatchlist = createAsyncThunk("account/addToWatchlist", async (data: { media_type: 'movie', media_id: MovieType["id"], watchlist: true }) => {
    const response: APIResponseType = await post(ADD_TO_WATCHLIST_ENDPOINT(data.media_id), data);
    return { status_code: response.status_code, status_message: response.status_message }

})

export const addMovieRating = createAsyncThunk("account/addMovieRating", async (data: { movieId: MovieType["id"], value: number }) => {
    const response: APIResponseType = await post(MOVIE_ENDPOINT(data.movieId), { value: data.value });
    return { status_code: response.status_code, status_message: response.status_message }

})


export const deleteMovieRating = createAsyncThunk("account/deleteMovieRating", async (data: { movieId: MovieType["id"] }) => {
    const response: APIResponseType = await Delete(MOVIE_ENDPOINT(data.movieId));
    return { status_code: response.status_code, status_message: response.status_message }
})

export const getRequestToken = createAsyncThunk("account/getRequestToken", async () => {
    const response: RequestToken = await get(GET_REQUEST_TOKEN);
    return response
})

export const getWatchList = createAsyncThunk("account/getWatchList", async () => {
    const response: WatchListType = await get(GET_WATCHLIST_ENDPOINT());
    return response["results"]
})

export const getRatedMovieList = createAsyncThunk("account/getRatedMovieList", async ({ accountId }: { accountId: AccountType["username"] }) => {
    const response: WatchListType = await get(GET_RATED_MOVIES_ENDPOINT(accountId));
    return response["results"]
})




export const AccountsSlice = createSlice({
    name: "account",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getRequestToken.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getRequestToken.fulfilled, (state, action: PayloadAction<RequestToken>) => {
            const { success, expires_at, request_token } = action.payload
            state.loading = false;
            if (!success) state.error = "Error @ request token"
            state.requestToken = action.payload
        })
        builder.addCase(getRequestToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        builder.addCase(getWatchList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getWatchList.fulfilled, (state, action: PayloadAction<WatchListType["results"]>) => {
            state.loading = false;
            if (!state.account) state.error = "Error @ login first"
            else state.account.watchlist = action.payload
        })
        builder.addCase(getWatchList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })


        builder.addCase(getRatedMovieList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getRatedMovieList.fulfilled, (state, action: PayloadAction<WatchListType["results"]>) => {
            state.loading = false;
            if (!state.account) state.error = "Error @ login first"
            else state.account.ratedMovieList = action.payload
        })
        builder.addCase(getRatedMovieList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        builder.addCase(login.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action: PayloadAction<{ username: string, request_token: string }>) => {
            const { username, request_token } = action.payload
            state.loading = false;
            state.account = { username, request_token, watchlist: [], ratedMovieList: [] }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })


        builder.addCase(addToWatchlist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addToWatchlist.fulfilled, (state, action: PayloadAction<APIResponseType>) => {
            const { status_code, status_message } = action.payload
            state.loading = false;
            if (status_code !== 1) {
                state.error = status_message
            }
        })
        builder.addCase(addToWatchlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })


        builder.addCase(addMovieRating.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addMovieRating.fulfilled, (state, action: PayloadAction<APIResponseType>) => {
            const { status_code, status_message } = action.payload
            state.loading = false;
            if (status_code !== 1) {
                state.error = status_message
            }
        })
        builder.addCase(addMovieRating.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })



        builder.addCase(deleteMovieRating.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteMovieRating.fulfilled, (state, action: PayloadAction<APIResponseType>) => {
            const { status_code, status_message } = action.payload
            state.loading = false;
            if (status_code !== 1) {
                state.error = status_message
            }
        })
        builder.addCase(deleteMovieRating.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    },
    reducers: {
        getAccount: (state, action: PayloadAction<any>) => {
            state.account = state.account
        },

    }
})

export const { getAccount } = AccountsSlice.actions

export default AccountsSlice.reducer