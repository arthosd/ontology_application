import React, { useState } from'react'
import { SafeAreaView,View , StyleSheet, FlatList} from 'react-native'

import { ADD_USER, GET_ALL_USER} from '../api/utilisateur.js';

import { Appbar, Modal, Portal, Provider, TextInput, Button , Headline, Caption} from "react-native-paper"
import { FAB } from 'react-native-paper';

import User_Card from './../Component/user_card.js';

export default function Home ({navigation, route}){

    const users_data = route.params?.users; // User data arrays

    const destination = route.params.destination;
    const nav = route.params.nav;
    const cities = route.params.cities;

    const [visible, setVisible] = useState(false);
    const [text, setText] = useState(''); // Inout Text

    const [data, setData] = useState(users_data);

    const [disabled, setDisabled] = useState (false) // Button

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    if (data.length === 0) {
        return(

            <SafeAreaView style={{ flex:1, backgroundColor:'white' }}>
                <Appbar.Header style={styles.bottom}>
                        <Appbar.Content title="Home" />
                        <Appbar.Action icon="bank-plus" onPress={() => { navigation.navigate("Place" ,{
                            cities : cities 
                        }) }} />
                </Appbar.Header> 

                <View style = {{
                    width : "100%",
                    height : "100%",
                    justifyContent :"center",
                    alignItems : 'center'
                }}>
                    <Headline>
                        Pas d'utilisateur trouvé
                    </Headline>
                    <Caption>
                        Vous pouvez ajouter des utilisateurs dans la base de données
                    </Caption>
                </View>

                <Provider>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} 
                               contentContainerStyle={styles.modal}>
                            
                            <Headline>
                                Nom utilisateur
                            </Headline>
                            
                            <TextInput
                                label="Nom"
                                mode = 'outlined'
                                value={text}
                                onChangeText={text => setText(text)}
                                style = {{
                                    marginBottom : 5
                                }}
                                />
                                <Button mode="contained" 
                                disabled = {disabled}
                                        onPress={() => {
                                            setDisabled(true)
                                            if (text.length != 0) {
                                                ADD_USER(
                                                    text,
                                                    (result) => {
                                                        GET_ALL_USER (
                                                            (result) => {
                                                                setVisible(false)
                                                                setText("")
                                                                setData(result.data)
                                                                setDisabled(false)
                                                            },
                                                            (err) => {
                                                                setDisabled(false)
                                                                console.log(result);
                                                            }
                                                        )
                                                    },
                                                    (erreur) => {
                                                        setDisabled(false)
                                                        console.log(erreur);
                                                    }
                                                )
                                            }
                                        }}
                                        color = "black"
                                        >
                                    Ajouter
                                </Button>
                        </Modal>
                    </Portal>
                </Provider>

                <FAB
                    style={styles.fab}
                    medium
                    label ="Add user"
                    icon="plus"
                    onPress={showModal}
                />
            </SafeAreaView>
        )
    }else{
        return(

            <SafeAreaView style={{ flex:1, backgroundColor:'white' }}>
                <Appbar.Header style={styles.bottom}>
                        <Appbar.Content title="Home" />
                        <Appbar.Action icon="bank-plus" onPress={() => { navigation.navigate("Place", {
                            cities : cities
                        })} } />
                </Appbar.Header> 

                <FlatList
                    data={data}
                    keyExtractor={item => item["URI"]}
                    renderItem={({item}) => (
                        <User_Card data = {item} 
                                   f = { () => navigation.navigate("Resume", {
                                    name : item["nom"],
                                    uri : item['URI'],
                                    destination : destination,
                                    nav : nav
                                }) }/>
                    ) }
                    keyExtractor={(item) => item["URI"]}
                />

                <Provider>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} 
                               contentContainerStyle={styles.modal}>
                            
                            <Headline>
                                Nom utilisateur
                            </Headline>
                            
                            <TextInput
                                label="Nom"
                                mode = 'outlined'
                                value={text}
                                onChangeText={text => setText(text)}
                                style = {{
                                    marginBottom : 5
                                }}
                                />
                                <Button mode="contained" 
                                        disabled = {disabled}
                                        onPress={() => {
                                            setDisabled(true)
                                            if (text.length != 0) {
                                                ADD_USER(
                                                    text,
                                                    (result) => {
                                                        ADD_USER(
                                                            text,
                                                            (result) => {
                                                                GET_ALL_USER (
                                                                    (result) => {
                                                                        setVisible(false)
                                                                        setText("")
                                                                        setData(result.data)
                                                                        setDisabled(false)
                                                                        console.log(result.data);
                                                                    },
                                                                    (err) => {
                                                                        setDisabled(false)
                                                                        console.log(result);
                                                                    }
                                                                )
                                                            },
                                                            (erreur) => {
                                                                setDisabled(false)
                                                                console.log(erreur);
                                                            }
                                                        )
                                                        
                                                    },
                                                    (erreur) => {
                                                        setDisabled(false)
                                                    }
                                                )
                                            }
                                        }}
                                        color = "black"
                                        >
                                    Ajouter
                                </Button>
                        </Modal>
                    </Portal>
                </Provider>

                <FAB
                    style={styles.fab}
                    medium
                    label ="Add user"
                    icon="plus"
                    onPress={showModal}
                />

            </SafeAreaView>
        ) 
    }

}

const styles = StyleSheet.create({
    bottom: {
      backgroundColor:'white'
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