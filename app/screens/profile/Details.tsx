import React from 'react'
import { View, Text, Image, TouchableHighlight, Animated } from "react-native";
import { USER } from "../../Constants";


export default function Detail({ name, attended, txtstyle, diamonds, obj, onBack, length, max, min, scroll }) {

    function Rower({ txt1, txt2 }) {
        return (
            <View>
                <Text style={txtstyle}>{txt1}</Text>
                <Text style={txtstyle}>{txt2}</Text>
            </View>
        )
    }
    const imageTranslate = length.interpolate({
        inputRange: [0, scroll],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });
    return (
        <Animated.View style={{
            paddingHorizontal: 20, paddingTop: 20, width: '100%',
            opacity: length.interpolate({
                inputRange: [0, scroll - 1, scroll],
                outputRange: [1, 1, 0],
                extrapolate: 'clamp'
            }),
            transform: [{ translateY: imageTranslate }],
        }}>
            <TouchableHighlight onPress={onBack}>
                <Image
                    source={{ uri: 'https://www.iconsdb.com/icons/preview/white/arrow-118-xxl.png' }}
                    style={{ width: 30, height: 30, marginTop: 10 }}
                />
            </TouchableHighlight>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                <View>
                    <Text style={txtstyle}>Welcome back,</Text>
                    <Text style={txtstyle}>{name}!</Text>
                </View>
                <View>
                    <Image
                        source={{ uri: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png' }}
                        style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 1 }}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                <Rower
                    txt1={attended}
                    txt2={'Tests given'}
                />
                <Rower
                    txt1={diamonds}
                    txt2={'Diamonds'}
                />
                <Rower
                    txt1={obj.mark}
                    txt2={'Top score'}
                />
            </View>
        </Animated.View>
    )
}
//by X