import { TouchableWithoutFeedback, View, Image } from "react-native";
import React from 'react'
import { NEXT } from "../../Constants";
import { WIDTH } from "../../theme/scale";


export default function HandleArrow({ count, onPrev, onNext }) {
    return (
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: WIDTH(350), alignSelf: 'center' }}>
            {(count != 0) ? <TouchableWithoutFeedback onPress={onPrev}>
                <Image
                    resizeMode='contain'
                    source={NEXT}
                    style={{ width: 30, height: 30, transform: [{ rotate: '180deg' }] }}
                />
            </TouchableWithoutFeedback> : <View />}
            {(count < 9) ? <TouchableWithoutFeedback onPress={onNext}>
                <Image
                    resizeMode='contain'
                    source={NEXT}
                    style={{ width: 30, height: 30 }}
                />
            </TouchableWithoutFeedback> : <View />}
        </View>
    )
}