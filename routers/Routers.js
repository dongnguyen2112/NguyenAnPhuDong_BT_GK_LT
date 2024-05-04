import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Text, StyleSheet } from 'react-native';
import Login from "../screen/Login";
import Register from "../screen/Register";
import Jobs from '../screen/Jobs';

const Stack = createStackNavigator();

const Routers = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: styles.headerTitle,
                }}
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Jobs" component={Jobs}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
        flex: 1,
        fontSize: 25,
    },
});
export default Routers;
