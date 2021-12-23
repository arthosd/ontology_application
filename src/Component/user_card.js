import React from "react";
import { Card, Title, Avatar} from 'react-native-paper';

import {View, StyleSheet, TouchableOpacity} from 'react-native';

export default function User_Card ({data, f}) {

    const [visible, setVisible] = React.useState(false);

    return (
        <Card style = {style.main} onPress = {f}>
            <Card.Content style = {{ flex: 1 , flexDirection : "row"}}>

                <View style = {{
                    flex : 10,
                }}>
                    <Title>{data['nom']}</Title>
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