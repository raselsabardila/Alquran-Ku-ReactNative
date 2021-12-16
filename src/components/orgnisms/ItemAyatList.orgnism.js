import React from "react";
import { View, Text } from "react-native";
import Tailwind from "../../libs/tailwind/Tailwind.lib";

const ItemAyatList = ({ item }) => {
    return (
        <View style={ Tailwind.style(`flex flex-col`) } >
            <View style={ Tailwind.style(`w-full px-4 py-3 flex flex-row items-center justify-between rounded-md bg-primary-green-fade mb-4`) } >
                <Text style={ Tailwind.style(`font-poppins-medium text-xs text-primary-green`) } >
                    Ayat ke
                </Text>
                <Text style={ Tailwind.style(`font-poppins-medium text-xs text-primary-green`) } >
                    { item.number.inSurah}
                </Text>
            </View>
            <View style={ Tailwind.style(`flex flex-col text-black flex-grow`) } >
                <Text style={ Tailwind.style(`font-poppins-medium text-xl text-accent-black mb-2 mt-1`)  } >
                    { item.text.arab }
                </Text>
                <Text style={ Tailwind.style(`font-poppins-regular text-xs text-primary-green text-justify leading-6 italic text-justify`) } >
                    { item.translation.id }
                </Text>
                <Text style={ Tailwind.style(`font-poppins-regular text-xs text-accent-black text-justify leading-6 mt-2`) } >
                    { item.text.transliteration.en }
                </Text>
            </View>
        </View>
    )
}

export default ItemAyatList