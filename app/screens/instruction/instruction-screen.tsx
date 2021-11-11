import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, View, Image, StatusBar, ImageStyle } from "react-native"
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color, typography } from "../../theme"
import Onboarding from 'react-native-onboarding-swiper';
import { MODE, NEXT, NEXTS, PLAY, START, TAP } from "../../Constants"
import { HEIGHT, WIDTH } from "../../theme/scale"


const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const IMG: ImageStyle = {
  height: HEIGHT(100),
  width: WIDTH(100)
}
export const InstructionScreen = observer(function InstructionScreen() {
  const navigation = useNavigation()
  const [active, setActive] = React.useState(0)
  let PAGE = [
    {
      backgroundColor: '#8fa2db',
      title: 'START PLAYING',
      image: <Image resizeMode='contain' source={PLAY} style={IMG} />,
      subtitle: 'Click on START PLAYING to start the game',
      name: 'Category '
    },
    {
      backgroundColor: '#a8a5e6',
      image: <Image resizeMode='contain' source={TAP} style={IMG} />,
      title: 'SELECT A CATEGORY',
      subtitle: 'Select a category from shown categories',
      name: 'Mode '
    },
    {
      backgroundColor: '#4da6b0',
      image: <Image resizeMode='contain' source={MODE} style={IMG} />,
      title: 'SELECT A MODE',
      subtitle: 'Select difficulty from hard,medium and easy',
      name: 'Begin '
    },
    {
      backgroundColor: '#ebb7e2',
      image: <Image resizeMode='contain' source={START} style={IMG} />,
      title: 'BEGIN',
      subtitle: 'Select answer,for every question 10 seconds are provided,after that question will be changed',
    },
  ]
  function Completed() {
    navigation.reset({
      index: 1,
      routes: [{ name: 'mainstack' }]
    })
  }
  function onNext() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: typography.ray, fontSize: 20, color: '#fff' }}>{PAGE[active].name}</Text>
        <Image source={NEXTS} style={{ width: 25, height: 20 }} />
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <StatusBar backgroundColor={PAGE[active].backgroundColor} translucent />
      <Onboarding
        pages={PAGE}
        onSkip={Completed}
        onDone={Completed}
        NextButtonComponent={onNext}
        nextLabel={PAGE[active].name}
        containerStyles={{ height: HEIGHT(30) }}
        titleStyles={{ fontFamily: typography.osaka, fontSize: 30, color: '#f1f1f1' }}
        subTitleStyles={{ fontFamily: typography.marko, fontSize: 30, color: '#f1f1f1' }}
        pageIndexCallback={(index: React.SetStateAction<number>) => setActive(index)}
      />
    </Screen>
  )
})
