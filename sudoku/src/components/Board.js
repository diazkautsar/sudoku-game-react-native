import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Alert
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
        console.log('Button ke triger')
        const data = { board }
        Axios({
            method: 'post',
            url: 'https://sugoku.herokuapp.com/validate',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => {
                console.log(response.data.status)
                if (response.data.status === 'unsolved') {
                    Alert.alert('HMMMMM', 'belajar lagi sono')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    if (loading || board.length < 1) return <Loading />

    return (
        <View>
            <View style={styles.outerBox}>
                {board.map((item, i) => (
                    <View key={i}>
                        {item.map((num, j) => (
                            <View>
                                <TextInput
                                    key={j}
                                    keyboardType="number-pad"
                                    style={styles.box}
                                    defaultValue={num ? num.toString() : ''}
                                    maxLength={1}
                                    onChangeText={text => handleOnChangeText(text, i, j)}
                                />
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outerBox: {
        borderColor: "white",
        height: 360,
        width: 360,
        flexDirection: 'row',
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