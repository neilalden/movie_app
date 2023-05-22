import { AccountStateType } from "./slice/account"
import { MoviesStateType } from "./slice/movies"

export type StateType = {
    Account: AccountStateType,
    Movies: MoviesStateType
}