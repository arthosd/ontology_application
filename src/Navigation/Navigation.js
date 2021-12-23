import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { MainStack } from './Stack';

export default function nav () {

    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}