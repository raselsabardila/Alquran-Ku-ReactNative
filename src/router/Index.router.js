import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home.screen"
import Splash from "../screens/Splash.screen"
import Detail from "../screens/Detail.screen"
import Search from "../screens/Search.screen"
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator()

const Index = () => {
    return (
        <NavigationContainer>
            <StatusBar hidden={ true } showHideTransition={ "fade" } />
            <Stack.Navigator initialRouteName="Splash" screenOptions={ { headerShown: false } } >
                <Stack.Screen name="Splash" component={ Splash } />
                <Stack.Screen name="Home" component={ Home } />
                <Stack.Screen name="Detail" component={ Detail } />
                <Stack.Screen name="Search" component={ Search } />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Index