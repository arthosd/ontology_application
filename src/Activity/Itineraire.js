import React, {useState, useEffect} from "react";
import { View, SafeAreaView, StyleSheet,FlatList, Picker} from "react-native";

import { GET_ITINERAIRE_TRAJET, ADD_ITINERAIRE_TRAJET } from "../api/trajet.js";

import {Appbar, ActivityIndicator, Caption, Headline, FAB, Provider, Modal, Portal, TextInput, Button} from "react-native-paper";

import Itineraire_Card from "../Component/itineraire_card.js";

export default function Itineraire ({navigation, route}) {

    const [moyen, setMoyen] = useState("RER")
    const [part, setPart] = useState(1)

    const [selectedValueNav, setSelectedValueNav] = useState("");

    const [disabled, setDisabled] = useState(false);

    const [selectedValueDebut, setSelectedValueDebut] = useState("");
    const [selectedValueFin, setSelectedValueFin] = useState("");

    const itineraire_name = route.params["name"]
    const nav = route.params.nav;
    const destination = route.params.destination;

    const pickerPart = () => {
        return (
            <Picker
                selectedValue={part}
                onValueChange={(itemValue, itemIndex) => setPart(itemValue)}
                >
                    <Picker.Item label="1" value={1} />
                    <Picker.Item label="2" value={2}  />
                    <Picker.Item label="3" value={3}  />
                    <Picker.Item label="4" value={4}  />
                    <Picker.Item label="5" value={5}  />
                    <Picker.Item label="6" value={6}  />
                    <Picker.Item label="7" value={7}  />
                    <Picker.Item label="8" value={8}  />
                    <Picker.Item label="9" value={9}  />

            </Picker>
        )
    }

    const pickerMoyen = () => {
        return (
            <Picker
                selectedValue={moyen}
                onValueChange={(itemValue, itemIndex) => setMoyen(itemValue)}
                >
                    <Picker.Item label="Rer" value="RER" />
                    <Picker.Item label="Metro" value="Metro" />
                    <Picker.Item label="Tramway" value="Tramway" />
                    <Picker.Item label="Bus" value="Bus" />
                    <Picker.Item label="VTC" value="VTC" />
                    <Picker.Item label="Trotinette" value="Trotinette" />
                    <Picker.Item label="Vélo" value="Vélo" />

            </Picker>
        )
    }

    const pickerItemNav = () => {

        return (
            <Picker
                selectedValue={selectedValueNav}
                onValueChange={(itemValue, itemIndex) => setSelectedValueNav(itemValue)}
                >
                    {
                        nav.map((item) => <Picker.Item label={item.ligne} value={item.URI} /> )
                    }
            </Picker>
        )
    }

    const pickerItemDestinationDebut = () => {
        return (
            <Picker
                selectedValue={selectedValueDebut}
                onValueChange={(itemValue, itemIndex) => setSelectedValueDebut(itemValue)}
                >
                    {
                        destination.map((item) => <Picker.Item label={item.gare} value={item.URI} /> )
                    }
            </Picker>
        )
    }

    const pickerItemDestinationFin = () => {
        return (
            <Picker
                selectedValue={selectedValueFin}
                onValueChange={(itemValue, itemIndex) => setSelectedValueFin(itemValue)}
                >
                    {
                        destination.map((item) => <Picker.Item label={item.gare} value={item.URI} /> )
                    }
            </Picker>
        )
    }

    const [visible, setVisible] = useState(false);

    const [isFetching, setIsFetching] = useState(true);
    const [data, setData] = useState([]);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        // Mise à jours du state
        GET_ITINERAIRE_TRAJET (
            itineraire_name,
            (result) => {
                setData (result.data)
                setIsFetching (false)
            },
            (err) => {
                setData ([])
                setIsFetching (false)
            }
        );
    }, [visible]);

    const render_fetch = (fetch) => {

        if (fetch == true) {
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
                        Chargement des trajets ...
                    </Caption>
                </View>
            );
        }else{

            if (data.length == 0) {
                return(
                    <View style = {{
                        width : "100%",
                        height : "100%",
                        justifyContent :"center",
                        alignItems : 'center'
                    }}>
                        <Headline>
                            Pas d'itineraire trouvé
                        </Headline>
                        <Caption>
                           Ce trajet ne possède pas d'itinéraire .
                        </Caption>
                        <Provider>
                            <Portal>
                                <Modal visible={visible} onDismiss={hideModal} 
                                    contentContainerStyle={styles.modal}>
                                    
                                    <Headline>
                                        Informations
                                    </Headline>
                                    
                                    { pickerMoyen() }
                                    { pickerPart() }
                                    { pickerItemNav() }
                                    { pickerItemDestinationDebut() }
                                    { pickerItemDestinationFin () }

                                    <Button mode="contained"
                                            disabled = {disabled} 
                                            onPress={() => {
                                                setDisabled(true)

                                                const stringChiffre = part.toString();
                                                const trajet_name = itineraire_name +"_"+stringChiffre
                                                

                                                ADD_ITINERAIRE_TRAJET(
                                                    itineraire_name,
                                                    trajet_name,
                                                    selectedValueNav,
                                                    selectedValueDebut,
                                                    selectedValueFin,
                                                    (result) => {
                                                        setDisabled(false)
                                                    },
                                                    (err) => {
                                                        console.log(err);
                                                        setDisabled(false)
                                                    }
                                                )
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
                            label ="Trajet"
                            icon="plus"
                            onPress={showModal}
                        />
                    </View>
                );
            }else{
                return(
                    <View style = {{
                        flex:1,
                        justifyContent : 'center',
                    }}>
                        <FlatList
                            data={data}
                            renderItem={({item}) => (
                                <Itineraire_Card data = {item} onClick = {() => { console.log("Ouais") }}/>
                            ) }
                            keyExtractor={(item) => item["URI"]} />
                            <Provider>
                            <Portal>
                                <Modal visible={visible} onDismiss={hideModal} 
                                    contentContainerStyle={styles.modal}>
                                    
                                    <Headline>
                                        Informations
                                    </Headline>
                                    
                                    { pickerMoyen() }
                                    { pickerPart ()}
                                    { pickerItemNav() }
                                    { pickerItemDestinationDebut() }
                                    { pickerItemDestinationFin () }

                                    <Button mode="contained" 
                                            onPress={() => {
                                                setDisabled(true)

                                                const stringChiffre = part.toString();
                                                const trajet_name = itineraire_name +"_"+stringChiffre
                                                

                                                ADD_ITINERAIRE_TRAJET(
                                                    itineraire_name,
                                                    trajet_name,
                                                    selectedValueNav,
                                                    selectedValueDebut,
                                                    selectedValueFin,
                                                    (result) => {
                                                        setDisabled(false)
                                                    },
                                                    (err) => {
                                                        console.log(err);
                                                        setDisabled(false)
                                                    }
                                                )
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
                            label ="Trajet"
                            icon="plus"
                            onPress={showModal}
                        />
                    </View>
                );
            }
        }
    }

    return(
        <SafeAreaView style={{ flex:1, backgroundColor:'white' }}>
            <Appbar.Header style={styles.bottom}>
                <Appbar.BackAction onPress={() => {navigation.goBack()}} />
                <Appbar.Content title="Itineraire" />
            </Appbar.Header> 

            <View style = {styles.main}>
                { render_fetch (isFetching) }
            </View>


        </SafeAreaView>
    );
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