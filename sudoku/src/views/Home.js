import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button,
    TextInput
} from 'react-native';

export default function Home({ navigation }) {
    const [name, setName] = useState('')

    return (
        <View style={styles.container}>
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
                onPress={() => navigation.navigate('Board', {
                    playerName: name
                })}
                />
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