import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    Text
} from 'react-native';
import Axios from 'axios';

import Loading from './Loading'
import { useSelector, useDispatch } from 'react-redux';
import { getBoard, setBoard, setSelectedColumn } from '../store/actionCreator';

export default function Board({ route, navigation }) {
    const loading = useSelector(state => state.boardReducer.loading)
    const board = useSelector(state => state.boardReducer.board)
    const backUpBoard = useSelector(state => state.backUpBoardReducer.backUpBoard)
    const { playerName } = route.params;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBoard())
    }, [])

    const handleOnChangeText = (value, row, col) => {
        dispatch(setSelectedColumn(+value, row, col))
        console.log(board, 'ini board')
        console.log(backUpBoard, 'ini backup board')
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
                    Alert.alert('HMMMMM', 'belajar lagi sono')
                } else {
                    navigation.navigate('Result')
                }
            })
            .catch(err => console.log(err))
    }

    const solveSudoku = () => {
        console.log('ke trigger dongs')
        Axios.post('https://sugoku.herokuapp.com/solve', encodeParams({ board: backUpBoard }))
            .then(({ data }) => {
                dispatch(setBoard(data.solution))
            })
            .catch(err => console.log(err))
    }

    const clearSudoku = () => {
        console.log('clear ke trigger')
        dispatch(setBoard(backUpBoard))
    }

    if (loading || !board.length) return <Loading />

    const getInput = (num, i, j) => {
        if (num) {
            return (
                <Text style={styles.box}>
                    {num}
                </Text>
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
                <Text>
                    {/* Selamat Datang Pak/Bu {playerName} */}
                    {JSON.stringify(board)}
                </Text>
            </View>
            <View style={styles.outerBox2}>
                {board.map((item, i) => (
                    <View key={i} style={styles.outerBox}>
                        {item.map((num, j) => (
                            <View >
                                {getInput(num, i, j)}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            <View>
                <View style={{ marginTop: 10 }}>
                    <Button
                        title="SUBMIT ANSWER"
                        onPress={() => checkAnswer()}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button
                        title="SOLVE SUDOKU"
                        onPress={() => solveSudoku()}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button
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
        textAlignVertical: "center"
    }
})