import React , {useState} from'react'
import { SafeAreaView, View, StyleSheet, Picker} from 'react-native'

import { ADD_PLACES } from '../api/place.js';

import { Appbar, Title, Paragraph, Button, TextInput} from "react-native-paper"

export default function Place ({navigation, route}){

    const [text_name, setTextName] = useState('');
    const [text_description, setTextDescription] = useState('');
    
    const [disabled, setDisabled] = useState(false);
    const cities = route.params.cities;

    const [c, setC] = useState("")

    const pickerC = () => {
        return (
            <Picker
                selectedValue={c}
                onValueChange={(itemValue, itemIndex) => setC(itemValue)}
                >
                    {
                        cities.map((item) => {
                            return ( <Picker.Item label={item.ville} value={item.URI} />)
                        })
                    }
            </Picker>
        )
    }

    return(
        <SafeAreaView style={{
            flex:1,
            backgroundColor:'white'
        }}>
            <Appbar.Header style={styles.bottom}>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
                <Appbar.Content title="Place" />
                <Appbar.Action icon="city" onPress={() => { navigation.navigate("Cities") }} />
                <Appbar.Action icon="bank-plus" onPress={() => { navigation.navigate("Show_places") }} />
            </Appbar.Header>

            <View style = {styles.header_view}>
                <Title style = {{
                    fontSize : 30
                }}>
                    Ajouter des places
                </Title>
                <Paragraph style = {{
                    fontSize : 20,
                    marginTop : 10
                }}>
                    Vous pouvez rajouter des noms de places connue dans la région Parisiène
                </Paragraph>
            </View>

            <View style = {styles.input_view}> 

                { pickerC ()}
                
                <TextInput
                    label="Nom"
                    value={text_name}
                    onChangeText={text => setTextName(text)}
                    selectionColor = "grey"
                    underlineColor = "black"
                    outlineColor = "black"
                    activeOutlineColor = "black"
                    mode = "outlined"
                    style = {{
                        backgroundColor : "white",
                        marginBottom : 10
                    }}
                />
                
                <TextInput
                    label="Description"
                    value={text_description}
                    multiline = {true}
                    selectionColor = "grey"
                    underlineColor = "black"
                    outlineColor = "black"
                    activeOutlineColor = "black"
                    mode = "outlined"
                    numberOfLine = {3}
                    onChangeText={text => setTextDescription(text)}
                    style = {{
                        backgroundColor : "white"
                    }}
                />
            </View>

            <View style = {styles.button_view}>
                <Button color ="black" 
                        mode="contained" 
                        disabled =  {disabled}
                        onPress={() => {
                            setDisabled (true)
                            ADD_PLACES (
                                text_name,
                                text_description,
                                c
                                ,
                                (result) => {
                                    setDisabled (false)
                                    setTextDescription('')
                                    setTextName('')
                                },
                                (error) => {
                                    setDisabled (false)
                                }
                            )
                        }}>
                    Ajouter
                </Button>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header_view: {
      flex : 2,
      justifyContent : 'center',
      paddingLeft : 5
    },
    input_view: {
        flex : 4,
        justifyContent : "center",
        paddingHorizontal:20
    },
    button_view : {
        flex : 1,
        justifyContent : 'center',
        paddingHorizontal : 10

    },bottom: {
        backgroundColor:'white'
      },
  });