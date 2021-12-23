import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './../Activity/Splash.js';
import Main from './../Activity/Home.js';
import Place from './../Activity/Place.js';
import Resume from '../Activity/Resume.js';
import Itineraire from '../Activity/Itineraire.js';
import Cities from '../Activity/Cities.js';
import Show_places from '../Activity/Show_places.js';

const Stack = createStackNavigator();

export function MainStack () {
    return (
        <Stack.Navigator screenOptions = {{
                         headerShown : false
                    }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Auth" component={Main} />
            <Stack.Screen name="Place" component={Place} />
            <Stack.Screen name="Resume" component={Resume} />
            <Stack.Screen name="Itineraire" component={Itineraire} />
            <Stack.Screen name="Cities" component={Cities} />
            <Stack.Screen name="Show_places" component={Show_places} />

        </Stack.Navigator>
    )
}
