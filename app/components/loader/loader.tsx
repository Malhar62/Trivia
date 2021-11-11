import * as React from "react"
import { Animated, Easing, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import { LOADER } from "../../Constants"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface LoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  load?: boolean
}

/**
 * Describe your component here
 */
export const Loader = observer(function Loader(props: LoaderProps) {
  const { style, load } = props
  const styles = flatten([CONTAINER, style])
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear, // Easing is an additional import from react-native
          useNativeDriver: true  // To make use of native driver for performance
        }
      )
    ).start()
  }, [load])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Image
        source={LOADER}
        style={{ height: 40, width: 40, transform: [{ rotate: spin }] }}
      />
    </View>
  )
})
