import * as React from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import { Modalize } from 'react-native-modalize';

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface SheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  modalizeRef?: any
  renderContent?: any
}

/**
 * Describe your component here
 */
export const Sheet = observer(function Sheet(props: SheetProps) {
  const { style, modalizeRef, renderContent } = props
  const styles = flatten([CONTAINER, style])

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={Dimensions.get('screen').height / 3}
      handlePosition="inside"
      useNativeDriver={true}
      modalHeight={Dimensions.get('screen').height/3}
      panGestureEnabled={true}
      closeOnOverlayTap={true}
      //onClose={() => onClosePress()}
      onBackButtonPress={() => true}
      //overlayStyle={backgroundStyle}
      //FooterComponent={renderFooter}
      //onOpen={() => onModalOpen && onModalOpen()}
      // keyboardVerticalOffset={100}
      keyboardAvoidingBehavior={'padding'}
      avoidKeyboardLikeIOS={true}
    >
      {renderContent()}
    </Modalize>
  )
})
