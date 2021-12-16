import React, { useEffect, useState } from "react";
import { LogBox, SafeAreaView, ScrollView, Text, TouchableHighlight, View, Image } from "react-native";
import Tailwind from "../libs/tailwind/Tailwind.lib";
import { SearchIcon } from "react-native-heroicons/outline"
import SuratList from "../components/orgnisms/SuratList.organism";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
    const [surat, setSurat] = useState([])

    LogBox.ignoreAllLogs(true)

    useEffect(() => {
        AsyncStorage.getItem("quran")
            .then(result => {
                setSurat(JSON.parse(result) || [])
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <SafeAreaView>
            <ScrollView style={ Tailwind.style(`py-6 bg-white min-h-full`) } >
                <View style={ Tailwind.style(`flex flex-row items-center w-full justify-between px-6`) } >
                    <View style={ Tailwind.style(`flex flex-col`) } >
                        <Text style={ Tailwind.style(`font-poppins-semibold text-2xl text-primary-green`) } >
                            Al-Quran Ku
                        </Text>
                        <Text style={ Tailwind.style(`font-poppins-regular text-xs text-accent-gray`) } >
                            Bacalah walau 1 ayat
                        </Text>
                    </View>
                    <TouchableHighlight underlayColor={ "#10101010" } style={ Tailwind.style(`rounded-full`) } onPress={ () => navigation.navigate("Search") } >
                        <SearchIcon style={ Tailwind.style(`text-accent-black`) } />
                    </TouchableHighlight>
                </View>
                <SafeAreaView style={ Tailwind.style(`mt-10 mb-6`) } >
                    {
                        (
                            surat.length ? <SuratList data={ surat } navigation={ navigation } /> :
                            <View style={ Tailwind.style(`w-full flex flex-row justify-center`) } >
                                <Image
                                    source={ require("../assets/images/loading.png") }
                                    style={ Tailwind.style(`w-96 h-96`) }
                                />
                            </View>
                        )
                    }
                </SafeAreaView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home