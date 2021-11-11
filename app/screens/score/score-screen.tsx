import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image, TouchableHighlight, FlatList, Dimensions } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { WALL } from "../../Constants"
import { stylo } from "./stylo"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const ScoreScreen = observer(function ScoreScreen() {
  // Pull in one of our MST stores
  const { queStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [active, setActive] = React.useState<any>(null)
  React.useEffect(() => {
    setActive(queStore.behind)
  }, [])
  return (
    <Screen style={ROOT} preset="fixed">
      <FlatList
        key={'#'}
        data={WALL}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={stylo.main}
            onPress={() => {
              queStore.changeWall(item.url)
              setActive(item.url)
            }}>
            <View style={{ width: '90%', height: '90%', borderWidth: queStore.behind == item.url ? 2 : 0, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                resizeMode='cover'
                source={item.url}
                style={{ width: '80%', height: '80%' }}
              />
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={index => 'index' + Math.random() + index}
      />
    </Screen>
  )
})
