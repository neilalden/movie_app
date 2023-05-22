export type VoidFunction = () => void;
export type ArgFunction = (arg?: any) => void;
export type MovieType = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    rating: number
}
export type AuthorDetailsType = {
    name: string;
    username: string;
    avatar_path: string;
    rating: null;
}
export type RatingType = {
    author: string;
    author_details: AuthorDetailsType;
    content: string;
    created_at: Date;
    id: string;
    updated_at: Date;
    url: string;
}
export const MovieListTypes = {
    NOW_PLAYING: "NOW PLAYING",
    TRENDING: "TRENDING",
    TOP_RATED: "TOP RATED",
    UPCOMING: "UPCOMING"
}

export type APIResponseType = { status_code: number, status_message: string }