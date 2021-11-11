import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, FlatList, View, TouchableOpacity, Image, BackHandler, Alert, Animated, Dimensions, TouchableWithoutFeedback } from "react-native"
import { Loader, Screen, Wallpaper } from "../../components"
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"
import { mainStyles } from "./mainStyles"
import { INFO, NEXT } from "../../Constants"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import RBSheet from "react-native-raw-bottom-sheet"
import OwnComponent from "./own"
import CircularProgress from "./Circle"
import { Sheet } from "../../components"
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
//import { createNativeStackNavigator } from "react-native-screens/native-stack"

export const MainScreen = observer(function MainScreen() {
  // Pull in one of our MST stores
  const { queStore } = useStores()
  const isFocused = useIsFocused()
  const route = useRoute<any>()
  const refRBSheet: any = React.useRef();
  const navigation = useNavigation()
  const [load, setLoad] = React.useState(false)
  const [obj, setObj] = React.useState<any>({})
  const [shuffled, setShuffled] = React.useState<any>([])
  const [ticket, setTicket] = React.useState<any>(queStore.answers.toJSON())
  const [hint, setHint] = React.useState<any>(['', '', '', '', '', '', '', '', '', '',])
  const [visible, setVisible] = React.useState(true)
  var count: number = route.params ? route.params.count : 0;
  const [time, setTime] = React.useState(10);
  const exitRef: any = React.useRef()
  //timer
  React.useEffect(() => {
    let intervalId = setInterval(() => {

      if (time > 0) {
        setTime(time - 1);
      } else {
        if (count < 9) {
          count = count + 1;
          //setCount(count + 1)
          navigation.navigate('main', { count })
        } else {
          if (visible) {
            HandleAlert()
            clearInterval(intervalId);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [time]);
  //api call
  React.useEffect(() => {
    let mounted = true;
    async function fetchData() {
      if (!route.params) {
        setLoad(true)
        await queStore.getQuestion()
        queStore.setGiven()
        if (queStore.questions.length != 0) {
          setObj(queStore.questions[count])
          var adder = [...queStore.questions[count].incorrect_answers];
          var final = adder.concat(queStore.questions[count].correct_answer)
          shuffler(final)
          setLoad(false)
          setTime(10)
          setVisible(true)
        }
      } else {
        if (queStore.questions.length != 0) {
          setObj(queStore.questions[count])
          var adder = [...queStore.questions[count].incorrect_answers];
          var final = adder.concat(queStore.questions[count].correct_answer)
          shuffler(final)
          setTime(10)
        }
      }
    }
    if (isFocused && mounted) {
      fetchData()
    }
    return () => { mounted = false }
  }, [isFocused, route.params, queStore.questions])

  function handleBackButtonClick() {
    exitRef.current.open()
    // Alert.alert(
    //   'EXIT',
    //   'Are you sure?',
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         queStore.defaultGiven()
    //         navigation.reset({
    //           index: 1,
    //           routes: [{ name: 'mainstack' }]
    //         })
    //       }
    //     },
    //     {
    //       text: "Cancel",
    //       style: "cancel"
    //     }
    //   ]
    // )
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  async function shuffler(array: any) {

    let currentIndex = array.length, randomIndex: number;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    setShuffled(array)
  }

  function HandleAlert() {
    if (visible) {
      Alert.alert(
        'Times Up!',
        'Check Score & Solution',
        [
          {
            text: 'OK',
            onPress: () => Finale()
          }
        ]
      )
    } else {
      return null;
    }
  }
  function Hinter() {
    if (hint[count] == '') {
      var dupli = [...hint];
      dupli.splice(count, 1, obj.correct_answer);
      setHint(dupli)
      queStore.hintUsed()
    } else {
      Alert.alert('Hint is already shown!')
    }
  }
  function InsideSheet() {
    return (
      <View style={{ marginTop: 10, justifyContent: 'center', height: 250, alignItems: 'center', width: 300, alignSelf: 'center' }}>
        <Text numberOfLines={2} style={{ fontSize: 18, fontFamily: typography.ray, textAlign: 'center' }}>ARE YOU SURE WANT TO EXIT THE TEST?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: '100%' }}>
          <TouchableOpacity
            style={{ width: 130, height: 60, borderRadius: 10, backgroundColor: 'gold', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' }}
            onPress={() => {
              queStore.defaultGiven()
              navigation.reset({
                index: 1,
                routes: [{ name: 'mainstack' }]
              })
            }}>
            <Text>EXIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 130, height: 60, borderRadius: 10, backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              exitRef.current.close()
            }}>
            <Text>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  function Information() {
    return (
      <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Image source={INFO} style={{ height: 20, width: 20 }} />
            <Text style={{ fontWeight: 'bold', }}>{count + 1}/10</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            if (queStore.diamonds > 0) {
              if (hint[count] == '') {
                Alert.alert(
                  'HINT',
                  'Confirm want to use?',
                  [
                    {
                      text: 'USE',
                      onPress: () => Hinter()
                    },
                    {
                      text: 'Cancel',
                      style: "cancel"
                    }
                  ]
                )
              } else {
                Alert.alert('Hint is already shown!')
              }
            }
          }}
        >
          <Image
            source={{ uri: 'https://i.pinimg.com/originals/cb/90/37/cb903765bb08119aa776add0da550915.png' }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <Text>{queStore.diamonds}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  function Finale() {
    queStore.addScore()
    setVisible(false)
    navigation.navigate('solution', { ID: queStore.given })
  }

  const handleClick = (item: any, ans: any) => {
    let isThere = queStore.answers.findIndex(x => (x.question == obj.question) && (x.category == obj.category) && (x.difficulty == obj.difficulty) && (x.ticked == item))
    if (isThere != -1) {
      queStore.removeAnswer(ans)
      setTicket(queStore.answers)
      console.log('*********already')
      console.log(queStore.answers)
    } else {
      queStore.addAnswer(ans)
      setTicket(queStore.answers)
      console.log('*********added')
      console.log(queStore.answers)
    }
  }

  function Insider({ item, index }) {

    return (
      <TouchableOpacity
        style={[mainStyles.option,
        { backgroundColor: ticket[count].ticked == item ? '#a365a0' : '#fff' }//queStore.answers[count].ticked
        ]}
        onPress={() => {
          let ans = {
            ...obj,
            ticked: item,
            quenum: count + 1,
            papernum: queStore.given,
            mcq: shuffled,
            isHint: hint[count] == '' ? false : true
          }
          handleClick(item, ans)
        }}
      >
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{item}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      {(!load) ?
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: WIDTH(350), alignSelf: 'center' }}>
          {(count != 0) ? <TouchableWithoutFeedback onPress={() => {
            if (count > 0) {
              count = count - 1;
              //setCount(count - 1)
              navigation.navigate('main', { count });
            }
          }}>
            <Image
              resizeMode='contain'
              source={NEXT}
              style={{ width: 30, height: 30, transform: [{ rotate: '180deg' }] }}
            />
          </TouchableWithoutFeedback> : <View />}
          {(count < 9) ? <TouchableWithoutFeedback onPress={() => {
            if (count < 9) {
              count = count + 1;
              //setCount(count + 1)
              navigation.navigate('main', { count });

            }
          }}>
            <Image
              resizeMode='contain'
              source={NEXT}
              style={{ width: 30, height: 30 }}
            />
          </TouchableWithoutFeedback> : <View />}
        </View>
        :
        <View />}

      {(!load) ?
        <View style={mainStyles.view}>
          <Information />
          {(visible) ?
            <View style={{ alignSelf: 'center' }}>
              <CircularProgress
                size={100}
                text={time}
                strokeWidth={7}
                progressPercent={time * (-10)}
                bgColor="#fff"
                pgColor={time < 4 ? 'red' : 'navy'}
              />
              {/* <CountdownCircleTimer
                key={time}
                isPlaying={true}
                duration={10}
                size={100}
                strokeWidth={7}
                colors={[
                  ['#004777', 0.4],
                  ['#F7B801', 0.4],
                  ['#A30000', 0.2],
                ]}
                onComplete={() => {
                  if (count < 9) {
                    count = count + 1;
                    navigation.navigate('main', { count });
                  } else {
                    HandleAlert()
                  }
                }}>
                {({ remainingTime, animatedColor }) => (
                  <Animated.Text style={{ color: animatedColor, fontSize: 25, fontFamily: typography.code }}>
                    {remainingTime}
                  </Animated.Text>
                )}
              </CountdownCircleTimer> */}
            </View> :
            <View
              style={{ height: HEIGHT(70) }}
            />
          }
          <Text style={{ color: 'grey', textAlign: 'center', marginTop: 10 }}>{obj.category}</Text>
          <Text style={{ color: 'grey', textAlign: 'center', marginTop: 10 }}>{obj.difficulty}</Text>
          <Text style={mainStyles.txt}>{obj.question}</Text>
          <FlatList
            data={shuffled}
            renderItem={({ item, index }) => (
              <Insider item={item} index={index} />
            )}
            keyExtractor={index => 'index' + Math.random() + index}
          />
          <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}>
            <Text style={{ fontFamily: typography.marko, color: 'green', fontSize: 30 }}>{hint[count].toString()}</Text>
          </View>
        </View >
        :
        <Loader />
      }
      {(count == 9) &&
        <View elevation={5} style={mainStyles.donebtn}>
          <TouchableOpacity onPress={Finale}>
            <Text style={{ color: '#fff', fontFamily: typography.code }}>S U B M I T</Text>
          </TouchableOpacity>
        </View>
      }
      <RBSheet
        height={Dimensions.get('screen').height / 2}
        closeOnPressBack={true}
        ref={refRBSheet}
        closeOnPressMask={true}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center"
          },
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.8)'
          },
        }}
      >
        <OwnComponent />
      </RBSheet>
      <Sheet
        modalizeRef={exitRef}
        renderContent={InsideSheet}
      />
    </Screen>
  )
})
