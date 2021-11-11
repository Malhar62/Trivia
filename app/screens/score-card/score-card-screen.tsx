import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Dimensions, StatusBar } from "react-native"
import { Screen, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import Accordion from 'react-native-collapsible/Accordion';
import { cardStyles } from "./cardStyles"
import { HEIGHT, WIDTH } from "../../theme/scale"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  height: Dimensions.get('screen').height
}

export const ScoreCardScreen = observer(function ScoreCardScreen() {
  // Pull in one of our MST stores
  const { queStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [active, setActive] = React.useState([queStore.scores.length - 1]);
  const NUM = WIDTH(30);
  const TITLE = Dimensions.get('screen').width - (2 * NUM);
  const high = HEIGHT(30)

  const renderHeader = (section: any, index: any) => {
    return (
      <View style={{ paddingVertical: 7, flexDirection: 'row' }}>
        <View style={{ backgroundColor: '#48154a', width: NUM, justifyContent: 'center', alignItems: 'center', height: high }}>
          <Text style={cardStyles.txt}>{section.paper}</Text>
        </View>
        <View style={{ backgroundColor: '#48154a', width: TITLE, marginLeft: 5, height: high, justifyContent: 'center' }}>
          <Text style={cardStyles.txt}>{section.answer[0].category}</Text>
        </View>
      </View>
    );
  };

  const renderContent = (section: any) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('solution', { ID: section.paper, flag: 'back' })}>
        {section.answer.map((item, index) => {
          return (
            <View style={{ borderBottomWidth: 1 }} key={index}>
              <Text style={cardStyles.intxt}>{item.quenum}.{item.question}</Text>
              <Text>your answer   : {item.ticked == '' ? 'left' : item.ticked}</Text>
              <Text>correct_answer: {item.correct_answer}</Text>
            </View>
          )
        })}
      </TouchableOpacity>
    );
  };
  return (
    <Screen style={ROOT} preset='fixed'>
      <StatusBar backgroundColor='transparent' translucent />
      <Wallpaper />
      <ScrollView>
        <Accordion
          activeSections={active}
          sections={queStore.scores}
          touchableComponent={TouchableOpacity}
          expandMultiple={false}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          containerStyle={{ paddingBottom: high + 20 }}
          sectionContainerStyle={{ marginHorizontal: 10, marginTop: 20 }}
          onChange={(id) => {
            setActive(id);
          }}
        />
      </ScrollView>
    </Screen>
  )
})
