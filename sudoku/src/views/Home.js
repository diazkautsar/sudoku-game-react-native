import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
     KeyboardAvoidingView
} from 'react-native';

export default function Home({ navigation }) {
    const [name, setName] = useState('')

    const goToBoard = () => {
        navigation.navigate('Board', {playerName: name})
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text>Your Name:</Text>
            <TextInput
                style={{
                    borderWidth: 2,
                    width: 300,
                    borderRadius: 5,
                }}
                onChangeText={(text) => setName(text)}
            />
            <View
                style={{
                    marginTop: 4
                }}
            >
                <Button
                    title="LETS PLAY BRO"
                    onPress={() => goToBoard()}
                />
            </View>
        </KeyboardAvoidingView>
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