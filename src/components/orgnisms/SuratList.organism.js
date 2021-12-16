import React from "react";
import { FlatList, TouchableHighlight, View } from "react-native"
import Tailwind from "../../libs/tailwind/Tailwind.lib";
import DropShadow from "react-native-drop-shadow";
import ItemSuratList from "./ItemSuratList.organism"

const SuratList = ({ data, navigation }) => {
    return (
        <FlatList
            data={ data }
            removeClippedSubviews={ true }
            initialNumToRender={ 5 }
            maxToRenderPerBatch={ 2 }
            scrollEnabled={ false }
            updateCellsBatchingPeriod={ 100 }
            CellRendererComponent={ DropShadow }
            ItemSeparatorComponent={ () => <View style={ Tailwind.style(`mb-4`) } /> }
            renderItem={ ({ item, index }) => {
                return (
                    <DropShadow
                        key={ item.name } 
                        style={{
                            shadowColor: "#086972",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.06,
                            shadowRadius: 3,
                            paddingHorizontal: 20,
                            paddingBottom: (index === data.length - 1) ? 24 : 0,
                        }}
                    >
                        <TouchableHighlight style={ Tailwind.style(`rounded-lg`) } onPress={ () => navigation.navigate("Detail", { payload: item }) } >
                            <ItemSuratList item={ item } />
                        </TouchableHighlight>
                    </DropShadow>
                )
            } }
        />
    )
}

export default SuratList