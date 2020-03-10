import React, { useState, useEffect } from 'react';
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

export default function Board({ route }) {
    const [board, setBoard] = useState('')
    const [loading, setLoading] = useState(false)
    const [backUpBoard, setBackUpBoard] = useState('')
    const { playerName } = route.params;

    useEffect(() => {
        setLoading(true)
        Axios.get('https://sugoku.herokuapp.com/board?difficulty=easy')
            .then(({ data }) => {
                setBoard(data.board)
                setBackUpBoard(data.board)

            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleOnChangeText = (value, row, col) => {
        board[row][col] = +value
        setBoard(board)
    }

    const encodeBoard = (board) => board.reduce((result, row, i) =>
        result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    const checkAnswer = () => {
        console.log(board);
        
        Axios.post('https://sugoku.herokuapp.com/validate', encodeParams({ board }))
            .then(response => {
                if (response.data.status !== 'solved') {
                    Alert.alert('HMMMMM', 'belajar lagi sono')
                } else {
                    Alert.alert('HOREEE', "kamu hebaattt")
                }
            })
            .catch(err => console.log(err))
    }

    const solveSudoku = () => {
        Axios.post('https://sugoku.herokuapp.com/solve', encodeParams({ board }))
            .then(({ data }) => {
                console.log(data)
                setBoard(data.solution)
            })
            .catch(err => console.log(err))
    }

    const clearSudoku = () => {
        setBoard(backUpBoard)
    }

    if (loading || board.length < 1) return <Loading />

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
                    Selamat Datang Pak {playerName}
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