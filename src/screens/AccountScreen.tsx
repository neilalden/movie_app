import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Icon from '../components/Icon'
import { images } from '../common/images'
import Gap from '../components/Gap'
import { post } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../services/redux/type'
import { getRatedMovieList, getRequestToken, getWatchList, login } from '../services/redux/slice/account'
import MovieCard from '../components/MovieCard'

const AccountScreen = (props: any) => {
    const { navigation } = props
    const dispatch = useDispatch()
    const requestToken = useSelector((state: StateType) => state.Account.requestToken);
    const account = useSelector((state: StateType) => state.Account.account);

    const watchlist = useSelector((state: StateType) => state.Account.account?.watchlist)
    const ratedMovieList = useSelector((state: StateType) => state.Account.account?.ratedMovieList)

    const [tabToggle, setTabToggle] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const ref = useRef<TextInput>();
    useEffect(() => {
        if (!requestToken) { dispatch(getRequestToken()); return; }
        if (new Date(requestToken.expires_at) >= new Date()) { dispatch(getRequestToken()); return; }
        if (account) return;
        if (!watchlist || watchlist?.length == 0) dispatch(getWatchList())
        if (!ratedMovieList || ratedMovieList?.length == 0) dispatch(getRatedMovieList(account.username))
    }, [])

    const handleSubmit = async () => {
        if (username && password && requestToken)
            dispatch(login({ username, password, request_token: requestToken.request_token }))
        else ref.current?.focus()
    }
    const goBack = () => {
        navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.container}>
            <Icon onPress={goBack} source={images.ic_back} />
            <Gap height={15} />
            {!account ?
                <>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Login</Text>
                        <Gap height={25} />
                        {/* @ts-ignore */}
                        <TextInput ref={ref} style={styles.textInput} placeholder="username" value={username} onChangeText={(text) => setUsername(text)} />
                        <Gap height={15} />
                        <TextInput style={styles.textInput} placeholder="password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
                        <Gap height={25} />
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <>
                    <View style={styles.tabBar}>
                        <TouchableOpacity style={[styles.tab, tabToggle && styles.tabActive]} onPress={() => setTabToggle(true)}>
                            <Text style={styles.tabText}>Watch list</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tab, !tabToggle && styles.tabActive]} onPress={() => setTabToggle(false)}>
                            <Text style={styles.tabText}>Rated movies</Text>
                        </TouchableOpacity>
                    </View>
                    <Gap height={25} />
                    <ScrollView>
                        {tabToggle && watchlist && watchlist.map(movie => <Fragment key={movie.id}><MovieCard movie={movie} showDetails /><Gap height={10} /></Fragment>)}
                        {!tabToggle && ratedMovieList && ratedMovieList.map(movie => <Fragment key={movie.id}><MovieCard movie={movie} showDetails /><Gap height={10} /></Fragment>)}
                    </ScrollView>
                </>
            }
        </SafeAreaView>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E0EBEB",
        flex: 1,
        padding: 15,
    },
    formContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black",
    },
    label: {
        color: "black",
        fontSize: 18
    },
    textInput: {
        height: 30,
        padding: 0,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        color: "black"
    },
    tabBar: {
        flexDirection: "row"
    },
    tab: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    tabActive: {
        borderBottomColor: "black",
        borderBottomWidth: 2
    },
    tabText: {
        color: "black",
        fontSize: 16
    },
    button: {
        alignSelf: "center",
        borderRadius: 5,
        backgroundColor: "black"
    },
    buttonText: {
        color: "white",
        paddingVertical: 5,
        paddingHorizontal: 10
    },
})