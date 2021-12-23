import React, {useEffect, useState} from 'react'

import { GET_CITIES } from '../api/place.js';

import { View, SafeAreaView, StyleSheet,FlatList} from "react-native";
import {Appbar, ActivityIndicator, Caption, Headline} from "react-native-paper";

import City_card from '../Component/city_card.js';

export default function Cities ({navigation}) {

    const [fetching, setFetching] = useState(false)
    const [data, setData ] = useState([])

    useEffect(() => {
        // Mise à jours du state
        GET_CITIES (
            (result) => {
                setData (result.data)
                setFetching (false)
            },
            (err) => {
                console.log(err)
                setData ([])
                setFetching (false)
            }
        );
    }, [fetching]);

    const renderFetch = (isFetching) => {
        if (isFetching === true) { // If we are fetching data
            return (
                <View style = {{
                    flex:1,
                    justifyContent : 'center',
                    alignItems : 'center'
                }}>
                    <ActivityIndicator animating={true} color = "black" size={40}/>

                    <Caption style = {{
                        marginTop : 10
                    }}>
                        Chargementdes villes ...
                    </Caption>
                </View>
            )
        }else{ // Not fetching
    
            if (data.length === 0) { // If there's no data to render
                return(
                    <View style = {{
                        width : "100%",
                        height : "100%",
                        justifyContent :"center",
                        alignItems : 'center'
                    }}>
                        <Headline>
                            Pas de villes trouvées
                        </Headline>
                        <Caption>
                           Nous n'avons pas trouvé de villes.
                        </Caption>
                    </View>
                )
            }else{ // If there's data
                return(
                    <View style = {{
                        flex:1,
                        justifyContent : 'center',
                    }}>
                        <FlatList
                            data={data}
                            renderItem={({item}) => (
                                <City_card data = {item}/>
                            ) }
                            keyExtractor = { (item) => item["URI"] }
                            />
                    </View>
                )
            }
        }
    }

    return (
        <SafeAreaView style={{ flex:1, backgroundColor:'white' }}>
            <Appbar.Header style={styles.bottom}>
                <Appbar.BackAction onPress={() => {navigation.goBack()}} />
                <Appbar.Content title="Cities" />
            </Appbar.Header> 

            <View style = {styles.main}>
                { renderFetch (fetching) }
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bottom: {
      backgroundColor:'white'
    },
    main : {
        flex : 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor : 'black'
      },
      modal : {
        backgroundColor: 'white', 
        padding: 10,
        marginHorizontal : 20
      }
  });