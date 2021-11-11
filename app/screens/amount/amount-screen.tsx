import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, Text, View, FlatList, Dimensions } from "react-native"
import { Screen, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { categoryStyles } from "../category/categoryStyles"
import { aligner } from "../../Constants"
import { amountStyles } from "./amountStyles"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

export const AmountScreen = observer(function AmountScreen() {
  // Pull in one of our MST stores
  const { queStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [mode, setMode] = React.useState('')
  const Modes = ['easy', 'medium', 'hard']

  function Insider({ item, index }) {
    return (
      <TouchableOpacity onPress={() => {
        queStore.setMode(item)
        setMode(item)
      }}>
        <View style={[categoryStyles.main, { backgroundColor: item == mode ? 'green' : 'rgba(52, 52, 52, 0.8)' }]}>
          <Text style={categoryStyles.txt}>{item.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>

    )
  }
  console.log(queStore.mode)
  return (
    <Screen style={[ROOT, amountStyles.main]} preset="fixed">
      <Wallpaper />
      <FlatList
        data={Modes}
        contentContainerStyle={{ marginTop: Dimensions.get('screen').height / 3 }}
        renderItem={({ item, index }) => (
          <Insider item={item} index={index} />
        )}
        keyExtractor={index => 'index' + Math.random() + index}
      />
      <View style={[categoryStyles.done, { backgroundColor: mode == '' ? '#e3dce3' : '#703d6e' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('main')}>
          <Text style={categoryStyles.txt}>{mode == '' ? 'SELECT MODE' : 'START'}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
