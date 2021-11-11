import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, TouchableOpacity, FlatList, View } from "react-native"
import { Loader, Screen, Wallpaper, } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { categoryStyles } from "./categoryStyles"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const CategoryScreen = observer(function CategoryScreen() {
  // Pull in one of our MST stores
  const { queStore } = useStores()
  const isFocused = useIsFocused()
  const [selected, setSelected] = React.useState({})
  const [isend, setIsend] = React.useState(false)
  const [load, setLoad] = React.useState(false)

  React.useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoad(true)
      await queStore.getCategory()
      setLoad(false)
    }
    if (isFocused && mounted) {
      fetchData()
    }
    return () => { mounted = false }
  }, [isFocused])
  // Pull in navigation via hook
  const navigation = useNavigation()
  function Insider({ item, index }) {
    return (
      <TouchableOpacity onPress={() => {
        queStore.setOneCat(item)
        setSelected(item)
      }}>
        <View style={[categoryStyles.main, { backgroundColor: item == selected ? 'green' : 'rgba(52, 52, 52, 0.8)' }]}>
          <Text style={categoryStyles.txt}>{item.name}</Text>
        </View>
      </TouchableOpacity>

    )
  }
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      {(!load) ?
        <FlatList
          data={queStore.categories.toJSON()}
          contentContainerStyle={{ paddingBottom: 50 }}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setIsend(true)
            } else {
              setIsend(false)
            }
          }}
          scrollEventThrottle={400}
          renderItem={({ item, index }) => (
            <Insider item={item} index={index} />
          )}
          keyExtractor={index => 'index' + Math.random() + index}
        /> :
        <Loader />
      }
      {(!load) && <Text style={categoryStyles.btmtxt}>{isend ? '' : 'scroll for more...'}</Text>}
      <View style={[categoryStyles.done, { backgroundColor: JSON.stringify(selected) == '{}' ? '#e3dce3' : '#703d6e' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('amount')}>
          <Text style={categoryStyles.txt}>{JSON.stringify(selected) == '{}' ? 'SELECT A CATEGORY' : 'PROCEED'}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
