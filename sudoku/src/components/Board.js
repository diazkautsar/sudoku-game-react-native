import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Axios from 'axios';

export default function Board() {
    const [board, setBoard] = useState('')
    const [sudoku, setSudoku] = useState('')

    useEffect(() => {
        Axios.get('https://sugoku.herokuapp.com/board?difficulty=easy')
            .then(({ data }) => {
                setBoard(data.board)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <View style={styles.outerBox}>
            {board.map((item, i) => <View key={i}>
                {item.map((kiko, i) => <Text key={i}  style={styles.box} >
                {kiko}
                </Text>)}
            </View>)}
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