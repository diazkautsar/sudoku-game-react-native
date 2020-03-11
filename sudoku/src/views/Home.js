import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

const radio_button = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
];

export default function Home({ navigation }) {
    const [name, setName] = useState('')
    const [useTimer, setUseTimer] = useState(false)

    const goToBoard = (value) => {
        navigation.navigate('Board', {
            playerName: name,
            level: value,
            timer: useTimer
        })
    }

    const tryTimer = (value) => {
        setUseTimer(value)
    }

    return (
        <View style={styles.container}>
            <Text>Your Name:</Text>
            <TextInput
                style={{
                    borderWidth: 2,
                    width: 300,
                    borderRadius: 5,
                    textAlign: 'center',
                }}
                placeholder="INPUT YOUR NAME FIRST"
                onChangeText={(text) => setName(text)}
            />
            <View style={{
                marginTop: 4
            }}
            >
                <Text>Use Timer: </Text>
                <RadioForm
                    radio_props={radio_button}
                    initial={true}
                    formHorizontal={true}
                    onPress={(value) => tryTimer(value)}
                />
            </View>
            <View
                style={{
                    marginTop: 4
                }}
            >
                <Text>SELECT DIFICULTY: </Text>
                <View style={{ marginTop: 5 }}>
                    <Button
                        disabled={!name}
                        title="EASY"
                        onPress={() => goToBoard('easy')}
                    />
                </View>
                <View style={{ marginTop: 5 }}>
                    <Button
                        disabled={!name}
                        title="MEDIUM"
                        onPress={() => goToBoard('medium')}
                    />
                </View>
                <View style={{ marginTop: 5 }}>
                    <Button
                        disabled={!name}
                        title="HARD"
                        onPress={() => goToBoard('hard')}
                    />
                </View>
                <View style={{ marginTop: 5 }}>
                    <Button
                        disabled={!name}
                        title="RANDOM"
                        onPress={() => goToBoard('random')}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});