import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, Text, TouchableHighlight, View, Dimensions, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Tailwind from "../libs/tailwind/Tailwind.lib"
import { ArrowLeftIcon } from "react-native-heroicons/outline"
import LinearGradient from "react-native-linear-gradient";
import ItemAyatList from "../components/orgnisms/ItemAyatList.orgnism";
import BottomBar from "../components/orgnisms/BottomBar.organism";
import { Fragment } from "react/cjs/react.production.min";
import Axios from "../configs/axios/Axios.config";
import RNReload from "react-native-restart"

const Detail = ({ navigation, route }) => {
    const bottomBarHeight = 70
    const screenHeight = Dimensions.get("screen").height - bottomBarHeight
    const [ayat, setAyat] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [orientation, setOrientation] = useState("")

    useEffect(() => {
        setOrientation(Dimensions.get("screen").height > Dimensions.get("screen").width ? "POTRAIT" : "LANDSCAPE")

        const listener = Dimensions.addEventListener("change", ({ screen }) => {
            setOrientation(screen.height > screen.width ? "POTRAIT" : "LANDSCAPE")
        })

        Axios.get(`/surah/${ route.params.payload.number }`)
            .then(result => {
                setAyat(result.data.data.verses || [])
                setIsLoading(false)
            }).catch(err => {
                Alert.alert("Error Message", err.message || "Please check you connection internet", [
                    {
                        text: "Reload",
                        onPress: () => RNReload.Restart()
                    }
                ])
            })

        return () => listener.remove()
    }, [])

    return (
        <SafeAreaView>
            {
                (
                    isLoading ? 
                        <View style={ Tailwind.style(`w-full bg-white min-h-full flex flex-col items-center justify-center`) } >
                            <ActivityIndicator size={ 40 }  style={ Tailwind.style(`text-primary-green mt-4`) } />
                        </View> :
                        <Fragment>
                            <ScrollView style={ [Tailwind.style(`bg-white p-6`), { height: screenHeight }] } >
                                <View style={ Tailwind.style(`flex flex-row items-center`) } >
                                    <TouchableHighlight underlayColor={ "#10101010" } style={ Tailwind.style(`rounded-full`) } onPress={ () => navigation.goBack() } >
                                        <ArrowLeftIcon style={ Tailwind.style(`text-accent-black`) } size={ 20 } />
                                    </TouchableHighlight>
                                    <Text style={ Tailwind.style(`font-poppins-semibold text-xl text-primary-green ml-4`) } >
                                        { route.params.payload.name }
                                    </Text>
                                </View>
                                <LinearGradient
                                    colors={ ["#08697290", "#086972"] }
                                    end={ { x: 1, y: 1 } }
                                    style={ Tailwind.style(`w-full flex flex-col items-center px-6 pt-10 rounded-2xl mt-6`) }
                                >
                                    <Text style={ Tailwind.style(`font-poppins-semibold text-2xl text-white`) } >
                                        { route.params.payload.name }
                                    </Text>
                                    <Text style={ Tailwind.style(`font-poppins-regular text-xs text-white`) } >
                                        { route.params.payload.translation } | { route.params.payload.numberOfVerses } ayat
                                    </Text>
                                    <Text style={ [Tailwind.style(`font-poppins-bold text-white mt-6`), { fontSize: 80 }] } >
                                        { route.params.payload.nameArab }
                                    </Text>
                                </LinearGradient>
                                <SafeAreaView style={ Tailwind.style(`mt-8`) } >
                                    <FlatList
                                        data={ ayat }
                                        scrollEnabled={ false }
                                        removeClippedSubviews={ true }
                                        initialNumToRender={ 5 }
                                        maxToRenderPerBatch={ 2 }
                                        updateCellsBatchingPeriod={ 100 }
                                        ItemSeparatorComponent={ () => <View style={ Tailwind.style(`mb-4`) } /> }
                                        ListFooterComponent={ () => <View style={ Tailwind.style(`mb-12`) } /> }
                                        renderItem={ ({ item, index }) => {
                                            return <ItemAyatList key={ index } item={ item } orientation={ orientation } />
                                        } }
                                    />
                                </SafeAreaView>
                            </ScrollView>
                            <BottomBar height={ bottomBarHeight } ayat={ ayat.map(item => `Ayat ke ${ item.number.inSurah }`) } sound={ ayat.map(item => item.audio.secondary[0]) } surat={ route.params.payload.name } />
                        </Fragment>
                )
            }
        </SafeAreaView>
    )
}

export default Detail