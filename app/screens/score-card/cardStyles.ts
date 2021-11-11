import { TextStyle, ViewStyle } from "react-native";
import { typography } from "../../theme";

export const cardStyles = {
    txt: {
        fontSize: 15,
        color: '#fff',
        fontFamily: typography.code
    } as TextStyle,
    intxt: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    } as TextStyle
}