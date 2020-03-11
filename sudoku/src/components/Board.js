import React, { useEffect } from 'react';
import Axios from 'axios';
import Loading from './Loading'
import { useSelector, useDispatch } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    Text,
} from 'react-native';
import {
    getBoard,
    setBoard,
    setSelectedColumn,
    getAnswerSudoku,
    setLeaderBoard,
    setStatusGame
} from '../store/actionCreator';

export default function Board({ route, navigation }) {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.boardReducer.loading)
    const board = useSelector(state => state.boardReducer.board)
    const checkBoard = useSelector(state => state.boardReducer.checkBoard)
    const backUpBoard = useSelector(state => state.backUpBoardReducer.backUpBoard)
    const statusGame = useSelector(state => state.boardReducer.statusGame)
    const { playerName } = route.params;
    const { level } = route.params
    const { timer } = route.params

    useEffect(() => {
        dispatch(getBoard(level))
    }, [])

    const handleOnChangeText = (value, row, col) => {
        dispatch(setSelectedColumn(+value, row, col))
    }

    const encodeBoard = (board) => board.reduce((result, row, i) =>
        result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    const checkAnswer = () => {
        Axios.post('https://sugoku.herokuapp.com/validate', encodeParams({ board }))
            .then(response => {
                if (response.data.status !== 'solved') {
                    Alert.alert('Bro...', 'masih ada yang salah')
                } else {
                    if (statusGame) {
                        Alert.alert('BRO...', "kamu ngec-cheat. itu haram bro", [
                            {
                                text: 'Back To Home', onPress: () => navigation.navigate('Home')
                            }
                        ])
                    } else {
                        dispatch(setLeaderBoard(playerName))
                        navigation.navigate('Winner')
                    }
                }
            })
            .catch(err => console.log(err))
    }

    const solveSudoku = () => {
        dispatch(getAnswerSudoku(backUpBoard))
    }

    const clearSudoku = () => {
        dispatch(setBoard(backUpBoard))
    }

    const timerFinish = () => {
        dispatch(setStatusGame(true))
        Alert.alert('BRO', 'WAKTU HABIS', [
            {
                text: 'Back To Home', onPress: () => navigation.navigate('Home')
            }
        ])
    }

    if (loading || !board.length) return <Loading />

    const getInput = (num, i, j) => {
        if (num) {
            return (
                <View>
                    {
                        checkBoard[i][j] ?
                            <Text style={styles.box}>
                                {num}
                            </Text> :
                            <TextInput
                                keyboardType="number-pad"
                                style={styles.box2}
                                maxLength={1}
                                value={num ? num.toString() : ''}
                                onChangeText={text => handleOnChangeText(text, i, j)}
                            />
                    }
                </View>
            )
        } else {
            return (
                <TextInput
                    keyboardType="number-pad"
                    style={styles.box}
                    maxLength={1}
                    onChangeText={text => handleOnChangeText(text, i, j)}
                />
            )
        }
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View>
                {timer ?
                    <View>
                        <CountDown
                            until={60}
                            size={30}
                            onFinish={() => timerFinish()}
                            digitStyle={{ backgroundColor: '#FFF' }}
                            digitTxtStyle={{ color: '#1CC625' }}
                            timeToShow={['M', 'S']}
                        />
                    </View>
                    : <View />}
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text>
                    Welcome Home {playerName}
                </Text>
                <Text>
                    Level yang dimainkan: {level}
                </Text>
            </View>
            <View style={styles.outerBox2}>
                {board.map((item, i) => (
                    <View key={i} style={styles.outerBox}>
                        {item.map((num, j) => (
                            <View key={j}>
                                {getInput(num, i, j)}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between"
            }}>
                <View style={{ margin: 10 }}>
                    <Button
                        // disabled={statusGame}
                        title="SUBMIT ANSWER"
                        onPress={() => checkAnswer()}
                    />
                </View>
                <View style={{ margin: 10 }}>
                    <Button
                        title="SOLVE SUDOKU"
                        onPress={() => solveSudoku()}
                    />
                </View>
                <View style={{ margin: 10 }}>
                    <Button
                        disabled={statusGame}
                        title="CLEAR"
                        onPress={() => clearSudoku()}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outerBox: {
        borderColor: "white",
        flexDirection: 'row',
    },
    outerBox2: {
        borderColor: "white",
    },
    box: {
        borderWidth: 2,
        borderColor: "black",
        height: 35,
        width: 35,
        textAlign: 'center',
        textAlignVertical: "center",
        margin: 2,
        color: 'red'
    },
    box2: {
        borderWidth: 2,
        borderColor: "black",
        height: 35,
        width: 35,
        textAlign: 'center',
        textAlignVertical: "center",
        margin: 2,
        color: 'black'
    }
})