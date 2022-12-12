import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, FlatList, Platform, TextStyle, View, ActivityIndicator, Animated, StatusBar } from "react-native"
import { Screen, Wallpaper } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import ProgressBar from "react-native-animated-progress";
import Detail from "./Details"
import { HEIGHT } from "../../theme/scale"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TXT: TextStyle = {
  fontSize: 20,
  fontFamily: typography.primary,
  color: '#f1f1f1',
  textAlign: 'center'
}
export const ProfileScreen = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  const { authStore, queStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const isFocused = useIsFocused()
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


  function Topper() {
    var scorer = [];
    queStore.scores.forEach((item) => {
      var count = 0;
      item.answer.forEach((element: { ticked: any; correct_answer: any }) => {
        if (element.ticked == element.correct_answer) {
          count++;
        }
      });
      scorer.push({ mark: count, category: item.answer[0].category })
    })
    var ArrMax = scorer.sort(function (a, b) {
      return b.mark - a.mark;
    });
    console.log(ArrMax[0].mark);
    return ArrMax[0];
  }
  function Result(name: string) {
    var count = 0;
    queStore.scores.forEach((item) => {
      var adder = 0;
      item.answer.forEach((element: { category: string }) => {
        if (element.category == name) {
          adder++;
        }
      })
      if (adder == 10) {
        count++
      }
    })
    var value = (count * 100) / queStore.scores.length
    return value;
  }
  const [length] = React.useState(new Animated.Value(0));
  const HEADER_HEIGHT = 250;
  const HEADER_LOW = 100;
  const SCROLL = HEADER_HEIGHT - HEADER_LOW;
  const headerTranslate = length.interpolate({
    inputRange: [0, SCROLL],
    outputRange: [0, -SCROLL],
    extrapolate: 'clamp',
  });

  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <View style={{ flex: 1 }}>
        {(!load) ?
          <FlatList
            data={queStore.categories}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: length } } }],
              { useNativeDriver: false }
            )}
            contentContainerStyle={{ marginTop: HEADER_HEIGHT, paddingBottom: HEADER_HEIGHT }}
            renderItem={({ item, index }) => (
              <View style={{ marginTop: index == 0 ? 0 : 20, height: HEIGHT(50), marginHorizontal: 10, backgroundColor: '#f1f1f1', borderRadius: 5, paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 25, fontFamily: typography.marko }}>{item.name}</Text>
                  <Text> ({(Result(item.name) * queStore.scores.length) / 100})</Text>
                </View>
                <ProgressBar progress={Result(item.name)} height={10} backgroundColor="navy" />
              </View>
            )}
          /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
              size='large'
              color='navy'
            />
          </View>}
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'blue',
          overflow: 'hidden',
          height: length.interpolate({
            inputRange: [0, SCROLL],
            outputRange: [HEADER_HEIGHT, HEADER_LOW],
            extrapolate: 'clamp'
          }),
          // transform: [{
          //   translateY: length.interpolate({
          //     inputRange: [0, SCROLL],
          //     outputRange: [0, -SCROLL],
          //     extrapolate: 'clamp'
          //   })
          // }],
          // opacity: length.interpolate({
          //   inputRange: [0, (SCROLL - 1), SCROLL],
          //   outputRange: [1, 1, 0],
          //   extrapolate: 'clamp'
          // })
        }}
      >

        <Detail
          name={authStore.email}
          attended={queStore.scores.length}
          diamonds={queStore.diamonds}
          txtstyle={TXT}
          obj={Topper()}
          onBack={() => navigation.goBack()}
          length={length}
          max={HEADER_HEIGHT}
          min={HEADER_LOW}
          scroll={SCROLL}
        />
      </Animated.View>
      <Animated.View style={{
        opacity: length.interpolate({
          inputRange: [0, (SCROLL - 10), SCROLL],
          outputRange: [0, 0, 1],
          extrapolate: 'clamp'
        }),
        backgroundColor: 'transparent',
        //marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: HEADER_LOW,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}>
        <Text style={[TXT, { marginTop: 0 }]}>PROFILE</Text>
      </Animated.View>
    </Screen >
  )
})
/**
 *  <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg',
            }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}>
          <Text style={styles.title}>Title</Text>
        </Animated.View>
 */
//changes done by Y
