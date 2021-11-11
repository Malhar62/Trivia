import { TextStyle, ViewStyle } from "react-native";
import { aligner } from "../../Constants";
import { HEIGHT, WIDTH } from "../../theme/scale";

export const mainStyles = {
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10
    } as TextStyle,
    view: {
        width: WIDTH(350),
        height: HEIGHT(600),
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        paddingHorizontal: 10
    } as ViewStyle,
    option: {
        width: WIDTH(300), alignSelf: 'center', borderRadius: 20, borderColor: 'navy',
        marginTop: 20,
        justifyContent: 'center', alignItems: 'center', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 10
    } as ViewStyle,
    donebtn: {
        backgroundColor: '#6b506e', width: WIDTH(350), alignSelf: 'center', height: 50, position: 'absolute', bottom: 20, ...aligner, borderRadius: 10
    } as ViewStyle
}