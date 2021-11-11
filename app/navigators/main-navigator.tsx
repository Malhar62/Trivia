/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WelcomeScreen, DemoScreen, DemoListScreen, HomeScreen, CategoryScreen, AmountScreen, ProfileScreen, ScoreCardScreen, MainScreen, SolutionScreen, InstructionScreen, LoginScreen, ScoreScreen } from "../screens"
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useStores } from "../models";
import { createNativeStackNavigator } from "react-native-screens/native-stack"


/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  home: undefined
  category: undefined
  score: undefined
  amount: undefined
  profile: undefined
  scorecard: undefined
  main: undefined
  mainstack: undefined
  solution: undefined
  login: undefined
  instruction: undefined
  authstack: undefined
  waller: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  const navigation = useNavigation()
  const { authStore } = useStores()
  React.useEffect(() => {
    if (authStore.islogin) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'home' }]
        })
      )
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'authstack' }]
        })
      )
    }
  }, [])
  const state = navigation.dangerouslyGetState();
  let actualRoute: any = state.routes[state.index];
  console.log(actualRoute.name)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='authstack' component={AuthStack} />
      <Stack.Screen name='mainstack' component={MainStack} />
    </Stack.Navigator>
  )
}
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='login' component={LoginScreen} />
    </Stack.Navigator>
  )
}
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="category" component={CategoryScreen} />
      <Stack.Screen name="amount" component={AmountScreen} />
      <Stack.Screen name='profile' component={ProfileScreen} />
      <Stack.Screen name='scorecard' component={ScoreCardScreen} />
      <Stack.Screen name='main' component={MainScreen} />
      <Stack.Screen name='solution' component={SolutionScreen} />
      <Stack.Screen name='instruction' component={InstructionScreen} />
      <Stack.Screen name='waller' component={ScoreScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
