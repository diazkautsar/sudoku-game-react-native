import React from 'react';
import { Text, View } from 'react-native';

import Board from '../components/Board'

export default function Home () {
    return (
        <View>
            <Text style={{color: "orchid"}}>
                Masuk
            </Text>
            <Board />
        </View>
    )
}