import React from "react";
import { Surface, Title, Divider, Headline} from 'react-native-paper';

import {View, StyleSheet, Text} from 'react-native';

export default function Itineraire_Card ({data, onClick}) {Text

    const trajet_name = data["nom"];
    const type = data["typeTransport"]
    const id = data.id;
    const transport =data["moyenTransport"];
    const gareDepart = data["depart"];
    const gareFin = data["arrivee"];


    console.log(type)

    return (
        <Surface style = {style.main} onPress = {onClick} elevation = {10}>
            <Headline>{trajet_name}</Headline>
            
            <View style = {{
                flex : 1,
                paddingTop : 5
            }}>
                <Title>Transport : {transport} </Title>
            </View>

            <Divider />

            <View style = {{
                flex : 1,
                paddingTop : 5
            }}>
                <Title>Type : {type} </Title>
                <Title>Départ : {gareDepart} </Title>
                <Title>Fin : {gareFin} </Title>
            </View>

            <Divider />

        </Surface>
    )
}

const style = StyleSheet.create({
    main : {
        width : '100%',
        elevation : 1,
        marginHorizontal : 5,
        marginVertical : 2,
        paddingHorizontal: 5
    }
})