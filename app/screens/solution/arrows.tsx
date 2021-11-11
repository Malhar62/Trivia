import React from "react"
import { View, TouchableWithoutFeedback, Image, Text } from "react-native"
import { NEXT } from "../../Constants"
import { typography } from "../../theme"
import { WIDTH } from "../../theme/scale"

export default function Arrows({ count, onNext, onPrev, marks }) {
    return (
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: WIDTH(350), alignSelf: 'center' }}>
            {(count != 0) ? <TouchableWithoutFeedback onPress={() => onPrev()}>
                <Image
                    resizeMode='contain'
                    source={NEXT}
                    style={{ width: 30, height: 30, transform: [{ rotate: '180deg' }] }}
                />
            </TouchableWithoutFeedback> : <View />}
            <View >
                <Text style={{ fontFamily: typography.code, fontSize: 18, color: "black", fontWeight: 'bold' }}>RESULT : {marks}</Text>
            </View>
            {(count < 9) ? <TouchableWithoutFeedback onPress={() => onNext()}>
                <Image
                    resizeMode='contain'
                    source={NEXT}
                    style={{ width: 30, height: 30 }}

                     

                />
            </TouchableWithoutFeedback> : <View />}
        </View>
    )
}
