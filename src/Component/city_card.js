import React from "react";
import { Card, Title, Avatar} from 'react-native-paper';

import {View, StyleSheet, TouchableOpacity} from 'react-native';

export default function City_card ({data}) {

    const [visible, setVisible] = React.useState(false);

    return (
        <Card style = {style.main}>
            <Card.Content style = {{ flex: 1 , flexDirection : "row"}}>

                <View style = {{
                    flex : 10,
                }}>
                    <Title>{data['ville']}</Title>
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