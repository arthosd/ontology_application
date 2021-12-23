import React from "react";
import { Card, Title} from 'react-native-paper';

import {View, StyleSheet} from 'react-native';

export default function Place_card ({data}) {

    return (
        <Card style = {style.main}>
            <Card.Content style = {{ flex: 1 , flexDirection : "row"}}>

                <View style = {{
                    flex : 10,
                }}>
                    <Title>{data['lieu']}</Title>
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