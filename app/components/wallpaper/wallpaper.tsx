import React from "react"
import { Image } from "react-native"
import { presets } from "./wallpaper.presets"
import { WallpaperProps } from "./wallpaper.props"
import { flatten } from "ramda"
import { useStores } from "../../models"
const defaultImage = require("../../../assets/images/back.png")

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const { preset = "stretch", style: styleOverride, backgroundImage } = props
  const { queStore } = useStores()
  // assemble the style
  const presetToUse = presets[preset] || presets.stretch
  const styles = flatten([presetToUse, styleOverride])

  // figure out which image to use
  const source = backgroundImage || defaultImage

  return <Image resizeMode='contain' source={queStore.behind} style={styles} />
}
