import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import Tailwind from "../libs/tailwind/Tailwind.lib"
import { SearchIcon } from "react-native-heroicons/outline"
import DropShadow from "react-native-drop-shadow"
import SuratList from "../components/orgnisms/SuratList.organism"
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = ({ navigation }) => {
    const [keyword, setKeyword] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [surat, setSurat] = useState([])
    const [searchSurat, setSearchSurat] = useState([])

    useEffect(() => {
        AsyncStorage.getItem("quran")
            .then(result => {
                setSurat(JSON.parse(result) || [])
                
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            }).catch(err => {
                Alert.alert("Error Message", err || "Failed get data from storage")
            })
    })

    useEffect(() => {
        if(!isLoading) {
            if(keyword) {
                setSearchSurat(surat.filter((value) => {
                    return String(String(value.name).toLowerCase()).includes(String(keyword).toLowerCase())
                }))
            } else {
                setSearchSurat([])
            }
        }
    }, [keyword]);

    return (
        <SafeAreaView>
            {
                (
                    isLoading ? 
                        <View style={ Tailwind.style(`w-full bg-white min-h-full flex flex-col items-center justify-center`) } >
                            <ActivityIndicator size={ 40 }  style={ Tailwind.style(`text-primary-green mt-4`) } />
                        </View> :
                        <ScrollView style={ Tailwind.style(`bg-white min-h-full`) } >
                            <DropShadow
                                style={{
                                    shadowColor: "#086972",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.08,
                                    shadowRadius: 3,
                                }}
                            >
                                <View style={ Tailwind.style(`p-6`) } >
                                    <View style={ Tailwind.style(`bg-white p-4 flex flex-row items-center rounded-lg`) } >
                                        <SearchIcon style={ Tailwind.style(`text-accent-black`) } />
                                        <TextInput
                                            placeholder={ "Cari surat..." }
                                            scrollEnabled={ false }
                                            style={ Tailwind.style(`p-0 text-sm font-poppins-medium text-accent-gray ml-3 flex-grow`) }
                                            onChangeText={ (value) => setKeyword(value) }
                                        />
                                    </View>
                                </View>
                            </DropShadow>
                            {
                                (
                                    (keyword) ? 
                                        <View style={ Tailwind.style(`flex flex-col mt-4`) } >
                                            <Text style={ Tailwind.style(`font-poppins-medium text-lg text-accent-black px-6 mb-4`) } >
                                                Hasil Pencarian ({ searchSurat.length })
                                            </Text>
                                            <SafeAreaView>
                                                {
                                                    (
                                                        searchSurat.length ? 
                                                            <SuratList data={ searchSurat } navigation={ navigation } /> :
                                                            <View style={ Tailwind.style(`w-full flex flex-col items-center justify-center`) } >
                                                                <Image
                                                                    source={ require("../assets/images/notfound.png") }
                                                                    style={ Tailwind.style(`w-64 h-64`) }
                                                                />
                                                            </View>
                                                    )
                                                }
                                            </SafeAreaView>
                                        </View> :
                                        <View style={ Tailwind.style(`flex flex-col items-center justify-center mt-12`) } >
                                            <Image
                                                source={ require("../assets/images/search.png") }
                                                style={ Tailwind.style(`w-72 h-72`) }
                                            />
                                        </View>
                                )
                            }
                        </ScrollView>
                )
            }
        </SafeAreaView>
    )
}

export default Search