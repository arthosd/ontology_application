import React, {useState, useEffect} from'react'
import { SafeAreaView, View, Dimensions} from 'react-native'

import { GET_ALL_USER } from '../api/utilisateur';
import { GET_DESTINATION, GET_CITIES } from '../api/place.js';
import { GET_ALL_NAVIGATION } from '../api/transport.js';

import * as Animatable from 'react-native-animatable';

const dimensionX = Dimensions.get("screen").width

export default function Splash ({navigation}){

        setTimeout(() => { 
            GET_ALL_USER(
                (result) => {
                    GET_DESTINATION (
                        (resDes) => {

                            GET_ALL_NAVIGATION (
                                (resNav) => {
                                    
                                    GET_CITIES(
                                        (resCities) => {
                                            navigation.navigate ("Auth", {
                                                "users"  : result.data,
                                                "destination" : resDes.data,
                                                "nav" :resNav.data,
                                                "cities" : resCities.data
                                            })
                                        },
                                        (err) => {

                                        }
                                    )
                                },
                                (errNav) => {

                                }
                            )
                        },
                        (err) => {

                        }
                    )
                },
                (err) => {
                    console.log(err)
                }
            )
         }, 1) 

        return(
            <SafeAreaView style={{
                flex:1,
                backgroundColor:'white'
            }}>
                <View style={{
                    flex:1,
                    justifyContent:"center",
                    alignItems:'center'
                }}>
                    <Animatable.Image  animation="bounce" 
                                        iterationCount="infinite" 
                                        duration={1600} 
                                        source ={require("./../../assets/logo.png")} 
                        style={{
                            height:dimensionX-20,
                            width:dimensionX-20,
                                
                        }}/>
                </View>
            </SafeAreaView>
            )
}