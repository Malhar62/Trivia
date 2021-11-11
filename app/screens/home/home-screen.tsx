import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, View, StatusBar, TouchableOpacity, Image } from "react-native"
import { Screen, Wallpaper } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { homeStyles } from "./homeStyles"
import { changeWallpaper, SCORE, USER } from "../../Constants"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { queStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  React.useEffect(() => {
    if (isFocused) {
      queStore.clearAns()
      queStore.clearQue()
      queStore.defaultGiven()
    }
  }, [isFocused])


  return (
    <Screen style={ROOT} preset="fixed">
      <StatusBar backgroundColor='transparent' translucent />
      <Wallpaper />
      <View style={homeStyles.logos}>
        <TouchableOpacity onPress={() => navigation.navigate('waller')}>
          <Image
            source={changeWallpaper}
            style={homeStyles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Image
            source={USER}
            style={homeStyles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('scorecard')}>
          <Image
            source={SCORE}
            style={homeStyles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={homeStyles.button}>
        <TouchableOpacity onPress={() => navigation.navigate('category')}>
          <Text style={homeStyles.txt}>START PLAYING</Text>
        </TouchableOpacity>
      </View>

      <View style={homeStyles.info}>
        <Image
          source={{ uri: 'https://www.iconsdb.com/icons/preview/white/info-xxl.png' }}
          style={{ height: 15, width: 15 }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('instruction')}>
          <Text style={{ color: '#fff', marginLeft: 5, fontSize: 10 }}>HOW TO PLAY</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
