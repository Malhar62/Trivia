import React from 'react'
import { Image, ScrollView, Text, View } from "react-native";
import { INFO } from '../../Constants';
import { typography } from '../../theme';

export default function OwnComponent() {
    let furray = [
        { name: 'Select option ' },
        { name: 'Press on arrows to navigate ' },
        { name: 'For each question there are 10 seconds is given' },
        { name: 'submit at the end or it will automatically submit when timer expires' }
    ]
    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <Image source={INFO}
                    style={{ width: 30, height: 30 }}
                />
                <Text>  INSTRUCTIONS</Text>
            </View>
            {furray.map((item, index) => {
                return (
                    <View style={{ marginTop: 10 }} key={index}>
                        <Text style={{ fontSize: 40, fontFamily: typography.marko, alignSelf: 'flex-start' }}>
                            {String(index + 1)}.{item.name}
                        </Text>
                    </View>
                )
            })}
        </ScrollView>
    )
}
