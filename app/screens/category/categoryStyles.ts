import { ViewStyle, TextStyle } from "react-native";
import { aligner } from "../../Constants";
import { WIDTH, HEIGHT } from "../../theme/scale";

export const categoryStyles = {
    main: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        width: WIDTH(350),
        height: HEIGHT(50),
        marginTop: 10,
        alignSelf: 'center',
        ...aligner
    } as ViewStyle,
    txt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    } as TextStyle,
    btmtxt: {
        position: 'absolute', right: 0, bottom: HEIGHT(50), color: '#fff', width: 50
    } as TextStyle,
    done: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: HEIGHT(50), ...aligner, borderTopWidth: 1
    } as ViewStyle
}