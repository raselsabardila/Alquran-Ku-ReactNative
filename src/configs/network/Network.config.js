import Netinfo from "@react-native-community/netinfo"
import { Alert } from "react-native"
import RNRestart from "react-native-restart"

const networkSubscribe = Netinfo.addEventListener((state) => {
    if(state.type === "unknown") {
        Alert.alert("System Warning", "Please check your internet connection", [
            {
                text: "Reload",
                onPress: () => RNRestart.Restart()
            }
        ])
    }
})

export default networkSubscribe