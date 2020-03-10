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

export default function Board() {
    const [board, setBoard] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        Axios.get('https://sugoku.herokuapp.com/board?difficulty=easy')
            .then(({ data }) => {
                setBoard(data.board)
                console.log(board);
                
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
        console.log(board, "INI DARI HANDLE")
    }

    const encodeBoard = (board) => board.reduce((result, row, i) =>
        result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    const checkAnswer = () => {
        console.log('Button ke triger')
        const data = { board }
        Axios.post('https://sugoku.herokuapp.com/validate', encodeParams({ board }))
        .then(response => {
            console.log(response)
            if (response.data.status !== 'solved') {
                          Alert.alert('HMMMMM', 'belajar lagi sono')
                        }
        })
        .catch(err => console.log(err))
        // Axios({
        //     method: 'post',
        //     url: 'https://sugoku.herokuapp.com/solve',
        //     body: encodeParams(data),
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        // })
        //     .then(response => {
        //         console.log(response)
        //         // if (response.data.status === 'unsolved') {
        //         //     Alert.alert('HMMMMM', 'belajar lagi sono')
        //         // }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
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
                    key={j}
                    keyboardType="number-pad"
                    style={styles.box}
                    maxLength={1}
                    onChangeText={text => handleOnChangeText(text, i, j)}
                />
            )
        }
    }

    return (
        <View>
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
                <Button
                    title="SUBMIT ANSWER"
                    onPress={() => checkAnswer()}
                />
                {/* <Text>
                    {JSON.stringify(board)}
                </Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outerBox: {
        borderColor: "white",
        // height: 360,
        // width: 360,
        flexDirection: 'row',
    },
    outerBox2: {
        borderColor: "white",
        height: 360,
        width: 360,
        // flexDirection: 'row',
    },
    box: {
        borderWidth: 2,
        borderColor: "black",
        height: 40,
        width: 40,
        textAlign: 'center',
        textAlignVertical: "center"
    }
})