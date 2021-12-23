import React from "react";
import { Card, Title, Avatar, Paragraph} from 'react-native-paper';

import {View, StyleSheet, TouchableOpacity} from 'react-native';

export default function Trajet_Card ({data, onClick}) {

    const trajet_name = data["nom"];
    const trajet_date = data["date"];
    const heure_debut = data["debut"];
    const heure_fin = data["fin"];

    return (
        <Card style = {style.main} onPress = {onClick}>
            <Card.Content style = {{ flex: 1 , flexDirection : "row"}}>

                <View style = {{
                    flex : 10,
                }}>
                    <Title>{trajet_name} - {trajet_date}</Title>
                    <Paragraph>{heure_debut} à {heure_fin} </Paragraph>
                </View>

                <View style = {{
                    flex:1,
                    alignItems : 'flex-end',
                    justifyContent : "center"
                }}>
                    <TouchableOpacity>
                        <Avatar.Icon  style = {{ backgroundColor : "white" }} color="grey" size={30} icon="delete"/>
                    </TouchableOpacity>
                </View>

            </Card.Content>
        </Card>
    )
}

const style = StyleSheet.create({
    main : {
        width : '100%',
        elevation : 1,
        marginHorizontal : 5,
        marginVertical : 2
    }
})