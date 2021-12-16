import React, { useState, useEffect } from "react";
import { Alert, Text, TouchableHighlight, View } from "react-native";
import Tailwind from "../../libs/tailwind/Tailwind.lib";
import { StopIcon, PlayIcon, ChevronDownIcon } from "react-native-heroicons/solid"
import SelectDropdown from 'react-native-select-dropdown'
import Sound from "react-native-sound";
import notifee from '@notifee/react-native'

let intervalTime = null

const BottomBar = ({ height, ayat, sound, surat }) => {
    const [music, setMusic] = useState(null)
    const [indexMusic, setIndexMusic] = useState(0)
    const [isPlayMusic, setIsPlayMusic] = useState(false)
    const [isPauseMusic, setIsPauseMusic] = useState(false)
    const [time, setTime] = useState("")

    useEffect(() => {
        if(music !== null) {
            music.stop()

            setIsPlayMusic(false)
            setIsPauseMusic(false)
    
            setMusic(null)
            clearInterval(intervalTime)
    
            return () => {
                clearInterval(intervalTime)
                music.release()
                setMusic(null)
            } 
        }
    }, [indexMusic]);

    const setIntervalMusic = () => {
        console.log("jalan")

        if(music !== null) {
            intervalTime = setInterval(() => {
                music.getCurrentTime((seconds) => {
                    setTime(seconds.toString())
                })
            }, 100);
        }
    }

    const showNotification = async () => {
        deissapearNotification()

        const channelId = await notifee.createChannel({
            id: `sound ayat`,
            name: "Channel Sound ayat"
        })

        await notifee.displayNotification({
            title: `Alquran-Ku`,
            body: `Menjalankan surat ${ surat } ayat ke ${ indexMusic + 1 }`,
            android: {
                channelId: channelId,
                largeIcon: require("../../assets/images/logo.png"),
                smallIcon: "logo",
                showTimestamp: true,
            }
        })
    }

    const deissapearNotification = async () => {
        try {
            await notifee.cancelAllNotifications()
        } catch(err) {
            console.log(err.message || "Erorr when show dissapear notification")
        }
    }

    const playSound = () => {
        Sound.setCategory("Playback")

        const musicNow = new Sound(sound[indexMusic], null, (err) => {
            if(err) {
                console.log(err.message || "Failed when play sound")

                return
            }

            setIsPlayMusic(true)
            showNotification()

            intervalTime = setInterval(() => {
                console.log("jalan")
                musicNow.getCurrentTime((seconds) => {
                    setTime(seconds.toString())
                })
            }, 100);

            musicNow.play(success => {
                if(success) {
                    musicNow.release()
                    setIsPlayMusic(false)
                    setIsPauseMusic(false)
                    clearInterval(intervalTime)

                    setTime("")
                } else {
                    clearInterval(intervalTime)
                    Alert.alert("Error Message", "Failed when play sound")
                }
            })
        })

        setMusic(musicNow)
    }

    const pauseSound = () => {
        setIsPauseMusic(true)
        setIsPlayMusic(false)
        clearInterval(intervalTime)

        music.pause()
    }

    const rePlayMusic = () => {
        setIsPauseMusic(false)
        setIsPlayMusic(true)

        setIntervalMusic()

        music.play()
    }

    return (
        <View style={ [{ height }, Tailwind.style(`w-full bg-primary-green px-6 py-4 flex flex-row items-center justify-between`)] } >
            <View style={ Tailwind.style(`flex flex-row items-center`) } >
                {
                    (
                        isPlayMusic ? 
                            <TouchableHighlight underlayColor={ "#ffffff00" } style={ Tailwind.style("rounded-full mx-1") } onPress={ () => pauseSound() } >
                                <StopIcon size={ 40 } style={ Tailwind.style(`text-white`) } />
                            </TouchableHighlight> :
                            <TouchableHighlight underlayColor={ "#ffffff00" } style={ Tailwind.style("rounded-full mx-1") } onPress={ () => {
                                if(indexMusic !== null) {
                                    (isPauseMusic) ? rePlayMusic() : playSound()
                                }
                            } } >
                                <PlayIcon size={ 40 } style={ Tailwind.style(`text-white ${ indexMusic !== null ? "opacity-100" : "opacity-30" }`) } />
                            </TouchableHighlight>
                    )
                }
                <View >
                    <SelectDropdown
                        data={ ayat }
                        onSelect={(selectedItem, index) => {
                            setIndexMusic(index)
                        }}
                        buttonStyle={ Tailwind.style(`bg-transparent w-24 p-0`) }
                        buttonTextStyle={ Tailwind.style(`font-poppins-medium text-xs text-white capitalize`) }
                        defaultValueByIndex={ 0 }
                        dropdownIconPosition={ "right" }
                        renderDropdownIcon={ () => <ChevronDownIcon size={ 20 } style={ Tailwind.style(`text-white -ml-4 -mt-px`) } /> }
                        rowStyle={ Tailwind.style(`bg-primary-green border-transparent`) }
                        rowTextStyle={ Tailwind.style(`font-poppins-medium text-xs text-white capitalize`) }
                        defaultButtonText={ "Pilih ayat" }
                        statusBarTranslucent={ true }
                    />
                </View>
            </View>
            <Text style={ Tailwind.style(`font-poppins-regular text-xs text-white`) } >
                { time || "--.--" }
            </Text>
        </View>
    )
}

export default BottomBar