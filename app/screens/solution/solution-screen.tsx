import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, View, TouchableOpacity, FlatList, BackHandler, TextStyle, Image } from "react-native"
import { Screen, Wallpaper } from "../../components"
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import Arrows from "./arrows"
import { mainStyles } from "../main/mainStyles"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  fontWeight: 'bold', fontSize: 18,
}
export const SolutionScreen = observer(function SolutionScreen() {
  // Pull in one of our MST stores
  const { queStore } = useStores()
  const isFocused = useIsFocused()
  const route = useRoute<any>()
  const navigation = useNavigation()
  const [obj, setObj] = React.useState<any>({})
  var count: number = route.params.count ? route.params.count : 0;
  var id: number = route.params.ID;
  var OBJ = queStore.scores.find(x => x.paper == id);
  var Real = OBJ.answer;
  React.useEffect(() => {
    if (isFocused) {
      setObj(Real[count])
    }
  }, [isFocused, route.params])

  function handleBackButtonClick() {
    if (route.params.flag) {
      navigation.goBack()
    } else {
      navigation.reset({
        index: 1,
        routes: [{ name: 'mainstack' }]
      })
    }
    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  function Question() {
    return (
      <View style={mainStyles.view}>
        <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{count + 1}/10</Text>
          {(obj.isHint) ? <Image
            source={{ uri: 'https://i.pinimg.com/originals/cb/90/37/cb903765bb08119aa776add0da550915.png' }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          /> : <View style={{ width: 40, height: 40, borderRadius: 20 }} />}
        </View>
        <Text style={{ color: 'grey', textAlign: 'center', marginTop: 10 }}>{obj.category}</Text>
        <Text style={mainStyles.txt}>{obj.question}</Text>
        <FlatList
          data={obj.mcq}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[mainStyles.option, { backgroundColor: getColor(item) }]}
            >
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={index => 'index' + Math.random() + index}
        />
        <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}>
          <Texter />
        </View>
      </View>
    )
  }

  function Texter() {
    if (obj.ticked == '') {
      return <Text style={{ ...TEXT, color: 'grey' }}>UNATTEMPTED</Text>
    } else {
      if (obj.ticked == obj.correct_answer) {
        return <Text style={{ ...TEXT, color: 'green' }}>TRUE</Text>
      } else {
        return <Text style={{ ...TEXT, color: 'red' }}>FALSE</Text>
      }
    }
  }
  function getColor(data: any) {
    if (obj.ticked == '') {
      if (data == obj.correct_answer) {
        return '#569954'
      } else {
        return '#fff'
      }
    } else {
      if (data == obj.correct_answer) {
        return '#569954'
      } else {
        if (data != obj.correct_answer && data == obj.ticked) {
          return '#eb5261'
        } else {
          return '#fff'
        }
      }
    }
  }
  function Rest() {
    var marks = 0;
    Real.forEach((element: { ticked: any; correct_answer: any }) => {
      if (element.ticked == element.correct_answer) {
        marks++;
      }
    });
    return marks;
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <Arrows
        count={count}
        marks={Rest()}
        onNext={() => {
          if (count < 9) {
            count = count + 1;
            navigation.navigate('solution', { count })
          }
        }}
        onPrev={() => {
          if (count > 0) {
            count = count - 1;
            navigation.navigate('solution', { count })
          }
        }}
      />
      <Question />
    </Screen>
  )
})
