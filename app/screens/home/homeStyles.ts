import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import { aligner } from "../../Constants";
import { HEIGHT, WIDTH } from "../../theme/scale";

export const homeStyles = {
    button: {
        position: 'absolute', bottom: HEIGHT(70), alignSelf: 'center', backgroundColor: '#fff', borderRadius: 30
    } as ViewStyle,
    txt: {
        paddingHorizontal: 40, paddingVertical: 20, fontWeight: 'bold'
    } as TextStyle,
    logos: { flexDirection: 'row', position: 'absolute', right: 20, top: 50, width: WIDTH(180), justifyContent: 'space-between' } as ViewStyle,

    info: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        ...aligner,
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 30
    } as ViewStyle,
    icon: {
        width: WIDTH(40),
        height: HEIGHT(40)
    } as ImageStyle
}