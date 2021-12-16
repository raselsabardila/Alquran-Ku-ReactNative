import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, SafeAreaView, Text, View } from "react-native";
import Tailwind from "../libs/tailwind/Tailwind.lib"
import Axios from "../configs/axios/Axios.config"
import AsyncStorage from "@react-native-async-storage/async-storage";
import networkSubscribe from "../configs/network/Network.config";
import RNRestart from "react-native-restart"

const Splash = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        networkSubscribe()

        setTimeout(() => {
            AsyncStorage.getItem("quran")
                .then(result => {
                    if(result === null || JSON.parse(result).length < 113) {
                        Axios.get("/surah")
                        .then(result => {
                            setDataSurat(result.data.data)
                        }).catch(err => {
                            Alert.alert("System Warning", "Please check your internet connection", [
                                {
                                    text: "Reload",
                                    onPress: () => RNRestart.Restart()
                                }
                            ])
                        })
                    } else {
                        setIsLoading(false)
                    }
                }).catch(err => {
                    Alert.alert("System Warning", "Please check your internet connection", [
                        {
                            text: "Reload",
                            onPress: () => RNRestart.Restart()
                        }
                    ])
                })
        }, 1000);
    }, [])
    
    useEffect(() => {
        if(!isLoading) {
            navigation.navigate("Home")
        }
    }, [isLoading])

    const setDataSurat = async (data) => {
        let payload = []
        let index = 0

        const interval = setInterval(() => {
            let isDuplicate = false

            networkSubscribe()

            Axios.get(`/surah/${ data[index].number }`)
                .then(result => {
                    payload.forEach(element => {
                        if(element.name === result.data.data.name.transliteration.id) {
                            isDuplicate = true
                        }
                    });

                    if(!isDuplicate) {
                        payload.push({
                            name: result.data.data.name.transliteration.id,
                            nameArab: result.data.data.name.short,
                            translation: result.data.data.name.translation.id,
                            numberOfVerses: result.data.data.numberOfVerses,
                            number: result.data.data.number
                        })
                    }

                    console.log(index)

                    if(index === 113) {
                        clearInterval(interval)
                        
                        AsyncStorage.setItem("quran", JSON.stringify(payload))
                            .then(result => {
                                setIsLoading(false)
                            }).catch(err => {
                                Alert.alert("Error Message", `${ err.message || "Please check your internet connection." }`)
                            })
                    }

                    index += 1
                }).catch(err => {
                    Alert.alert("Error Message", `${ err.message || "Please check your internet connection." }`)
                })
        }, 1000)
    }

    return (
        <SafeAreaView>
            <View style={ Tailwind.style(`w-full min-h-full flex flex-col items-center justify-center`) } >
                <View style={ Tailwind.style(`flex flex-col items-center`) } >
                    <Image
                        source={ require("../assets/images/logo.png") }
                        style={ Tailwind.style(`w-48 h-48`) }
                    />
                    <Text style={ Tailwind.style(`font-poppins-semibold text-accent-black text-2xl`) } >
                        Al-Quran Ku
                    </Text>
                    <ActivityIndicator size={ 40 }  style={ Tailwind.style(`text-primary-green mt-4`) } />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Splash