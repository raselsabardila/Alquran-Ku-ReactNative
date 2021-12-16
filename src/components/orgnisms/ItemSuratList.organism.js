import React from "react";
import { Text, View } from "react-native";
import Tailwind from "../../libs/tailwind/Tailwind.lib";

const ItemSuratList = ({ item }) => {
    return (
        <View style={ Tailwind.style(`w-full p-4 rounded-lg bg-white flex flex-row items-center justify-between`) } >
            <View style={ Tailwind.style(`flex flex-col`) } >
                <Text style={ Tailwind.style(`font-poppins-medium text-lg text-primary-green`) } >
                    { item.name }
                </Text>
                <Text style={ Tailwind.style(`font-poppins-regular text-xs text-accent-gray`) } >
                    { item.translation } | { item.numberOfVerses } ayat
                </Text>
            </View>
            <Text style={ [Tailwind.style(`font-poppins-bold text-primary-green text-3xl`), { transform: [{ translateY: 6 }] }] } >
                { item.nameArab }
            </Text>
        </View>
    )
}

export default ItemSuratList