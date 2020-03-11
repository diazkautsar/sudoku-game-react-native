import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native'

export default function Result() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Image
                source={{
                    uri: 'https://db3ujbgzkl8k8.cloudfront.net/catalog/product/thumbnail/692d88758463bc350d5a5a51c2aae362/image/700x700/000/80/u/e/uefa-cl-150.jpg'
                }}
                style={{
                    width: '100%', height: '100%'
                }}
            />
        </View>
    )
}