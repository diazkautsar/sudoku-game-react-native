import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux';

export default function Result() {
    const name = useSelector(state => state.boardReducer.leaderBoard)

    return (
        <ImageBackground style={{height: '100%', width: '100%'}} source={{
            uri: 'https://i.pinimg.com/originals/d1/29/6d/d1296d5419f53391f38563e894fc4e67.png'
        }}
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {name.length ? 
            <View>
                <Text style={style.text}>Yang Sudah Berhasil: </Text>
                {name.map((name, i) => {
                    return <Text key={i}>{name}</Text>
                })}
            </View> : <Text style={style.text}>
                Belum Ada Yang Menang Nichh...
            </Text> 
            }
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    }
})

