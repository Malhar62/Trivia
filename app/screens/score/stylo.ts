import { Dimensions, ViewStyle } from "react-native";
import { aligner } from "../../Constants";


export const stylo = {
    main: {
        width: Dimensions.get('screen').width / 2,
        height: Dimensions.get('screen').height / 3,
        ...aligner,
    } as ViewStyle
}