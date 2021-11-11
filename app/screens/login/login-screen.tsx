import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native"
import { Screen, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"
import { KEY, MAIL, QUIZ } from "../../Constants"
import { loginStyles } from "./loginStyles"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { authStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [mail, setMail] = React.useState('')
  const [pass, setPass] = React.useState('')
  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <View style={{ height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={QUIZ}
          style={{
            width: 100, height: 100, shadowOpacity: 0.2,
            shadowRadius: 10,
          }}
        />
      </View>
      <View style={loginStyles.main}>
        <View style={loginStyles.txtip}>
          <Image
            source={MAIL}
            style={{ width: 30, height: 30 }}
          />
          <TextInput
            placeholder='Enter email...'
            value={mail}
            onChangeText={data => setMail(data)}
            style={{ width: WIDTH(300), height: HEIGHT(50) }}
          />
        </View>
        <View style={loginStyles.txtip}>
          <Image
            source={KEY}
            style={{ width: 30, height: 30 }}
          />
          <TextInput
            placeholder='Enter password...'
            value={pass}
            onChangeText={data => setPass(data)}
            style={{ width: WIDTH(300), height: HEIGHT(50) }}
          />
        </View>
        <View style={[loginStyles.txtip, { backgroundColor: '#7a9acf', marginTop: 10 }]}>
          <TouchableOpacity
            onPress={() => {
              if (mail != '' && pass != '') {
                authStore.onLogin({ mail, pass })
                navigation.reset({
                  index: 1,
                  routes: [{ name: 'mainstack' }]
                })
              } else {
                Alert.alert('ENTER DETAILS')
              }
            }}
          >
            <Text style={{ fontFamily: typography.ray }}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})
