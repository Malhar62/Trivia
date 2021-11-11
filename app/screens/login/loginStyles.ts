import { ViewStyle } from "react-native";
import { aligner } from "../../Constants";
import { HEIGHT, WIDTH } from "../../theme/scale";


export const loginStyles = {
    main: {
        height: HEIGHT(400), width: WIDTH(350), position: 'absolute', bottom: 40, backgroundColor: '#fff', ...aligner, alignSelf: 'center', borderRadius: 30
    } as ViewStyle,
    txtip: {
        width: WIDTH(330), height: HEIGHT(50), ...aligner, flexDirection: 'row', alignSelf: 'center',
        backgroundColor: '#f1f1f1', marginTop: 10, borderRadius: 10
    } as ViewStyle
}