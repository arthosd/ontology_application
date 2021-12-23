import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList} from "react-native";

import { GET_USER_ITINERAIRE, ADD_ITINERAIRE } from '../api/trajet.js';

import { Button,TextInput,Appbar, ActivityIndicator, Caption, Headline, FAB, Modal, Portal, Provider} from "react-native-paper";

import DateTimePicker from '@react-native-community/datetimepicker';

import Trajet_Card from '../Component/trajet_card';

export default function Resume ({navigation, route}) {


    const [date, setDate] = useState(new Date(1598051730000));
    
    const [heureDepart, setHeureDepart] = useState(new Date(1598051730000));
    const [heureArrive, setHeureArrive] = useState(new Date(1598051730000));

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [showDebut, setShowDebut] = useState(false);
    const [showFin, setShowFin] = useState(false);



    const showDatePicker = () => {
        setShow(true)
    }

    const showTimeDebut = () => {
        setShowDebut(true)
    }
    const showTimeFin = () => {
        setShowFin(true)
    }

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
      };

      const onChangeDebut = (event, selectedTime) => {
        const currentDate = selectedTime || heureDepart;
        setShowDebut(false);
        setHeureDepart(currentDate);
      };

      const onChangeFin = (event, selectedTime) => {
        const currentDate = selectedTime || heureFin;
        setShowFin(false);
        setHeureArrive(currentDate);
      };
    

    const user_name = route.params.name;
    const user_id = route.params.id;

    const nav = route.params.nav;
    const destination = route.params.destination;

    const [text, setText] = useState(''); // Inout Text

    const [disabled, setDisabled] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [isFetching, setIsFetching] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Mise à jours du state
        GET_USER_ITINERAIRE (
            user_name,
            (result) => {
                setData (result.data)
                setIsFetching (false)
            },
            (err) => {
                console.log(err)
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
                            Pas de trajets trouvé
                        </Headline>
                        <Caption>
                            Nous n'avons pas trouvé de trajets pour {user_name}.
                        </Caption>
                        <FAB
                            style={styles.fab}
                            medium
                            label ="Trajet"
                            icon="plus"
                            onPress={showModal}
                        />
                        <Provider>
                            <Portal>
                            <Modal visible={visible} onDismiss={hideModal} 
                                    contentContainerStyle={styles.modal}>
                                    
                                    <Headline>
                                        Itineraire
                                    </Headline>
                                    {show && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                        />
                                    )}

                                    {showDebut && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='time'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeDebut}
                                        />
                                    )}

                                    {showFin && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='time'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeFin}
                                        />
                                    )}

                                    <TextInput  
                                        onPress = {() => {console.log("clicked")}}
                                        label="Nom"
                                        mode = 'outlined'
                                        value={text}
                                        onChangeText={text => setText(text)}
                                        style = {{
                                            marginBottom : 5
                                        }}
                                        />
                                    <TextInput
                                        label="Date"
                                        mode = 'outlined'
                                        disabled = {true}
                                        style = {{
                                            marginBottom : 5
                                        }}
                                    />

                                    <Button mode = "text"
                                            color="black"
                                            onPress={() => showDatePicker()}
                                            >
                                        Ajout date
                                    </Button>

                                    <TextInput
                                        label="Heure départ"
                                        mode = 'outlined'
                                        disabled = {true}
                                        style = {{
                                            marginBottom : 5
                                        }}
                                        
                                    />
                                    <Button mode = "text"
                                            color="black"
                                            onPress={() => showTimeDebut()}
                                            >
                                        Ajout Heure départ
                                    </Button>

                                   <TextInput
                                        label="Heure arrivé"
                                        mode = 'outlined'
                                        disabled = {true}
                                        style = {{
                                            marginBottom : 5
                                        }}
                                    />
                                    <Button mode = "text"
                                            color="black"
                                            onPress={() => showTimeFin()}
                                            >
                                        ajout heure arrivée
                                    </Button>
                                    <Button mode="contained" 
                                            disabled = {disabled}
                                            onPress={() => {
                                                setDisabled(true)
                                                ADD_ITINERAIRE(
                                                    user_name,
                                                    text,
                                                    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
                                                    heureDepart.getHours() + "h" + (heureDepart.getMinutes()),
                                                    heureArrive.getHours() + "h" + (heureArrive.getMinutes()),
                                                    (result) => {
                                                        GET_USER_ITINERAIRE(
                                                            user_name,
                                                            (result) => {
                                                                setDisabled(false)
                                                                setVisible(false)

                                                                setDate("")
                                                                setData (result.data)
                                                            },
                                                            (err) => {
                                                                setDisabled(false)
                                                            }
                                                        )
                                                    },
                                                    (err) => {
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
                                <Trajet_Card data = {item} onClick = { () => navigation.navigate("Itineraire", {
                                    user_name : user_name,
                                    name : item["nom"],
                                    id : item["URI"],
                                    destination : destination,
                                    nav : nav
                                }) }/>
                            ) }
                            keyExtractor={(item) => item["URI"]} />
                        <FAB
                            style={styles.fab}
                            medium
                            label ="Trajet"
                            icon="plus"
                            onPress={showModal}
                        />
                        <Provider>
                            <Portal>
                                <Modal visible={visible} onDismiss={hideModal} 
                                    contentContainerStyle={styles.modal}>
                                    
                                    <Headline>
                                        Itineraire
                                    </Headline>
                                    {show && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                        />
                                    )}

                                    {showDebut && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='time'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeDebut}
                                        />
                                    )}

                                    {showFin && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='time'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeFin}
                                        />
                                    )}

                                    <TextInput  
                                        onPress = {() => {console.log("clicked")}}
                                        label="Nom"
                                        mode = 'outlined'
                                        value={text}
                                        onChangeText={text => setText(text)}
                                        style = {{
                                            marginBottom : 5
                                        }}
                                        />
                                    <TextInput
                                        label="Date"
                                        mode = 'outlined'
                                        disabled = {true}
                                        style = {{
                                            marginBottom : 5
                                        }}
                                    />

                                    <Button mode = "text"
                                            color="black"
                                            onPress={() => showDatePicker()}
                                            >
                                        Ajout date
                                    </Button>

                                    <TextInput
                                        label="Heure départ"
                                        mode = 'outlined'
                                        disabled = {true}
                                        style = {{
                                            marginBottom : 5
                                        }}
                                        
                                    />
                                    <Button mode = "text"
                                            color="black"
                                            onPress={() => showTimeDebut()}
                                            >
                                        Ajout Heure départ
                                    </Button>

                                   <TextInput
                                        label="Heure arrivé"
                                        mode = 'outlined'
                                        disabled = {true}
                                        style = {{
                                            marginBottom : 5
                                        }}
                                    />
                                    <Button mode = "text"
                                            color="black"
                                            onPress={() => showTimeFin()}
                                            >
                                        ajout heure arrivée
                                    </Button>
                                    <Button mode="contained" 
                                            disabled = {disabled}
                                            onPress={() => {
                                                setDisabled(true)
                                                ADD_ITINERAIRE(
                                                    user_name,
                                                    text,
                                                    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
                                                    heureDepart.getHours() + "h" + (heureDepart.getMinutes()),
                                                    heureArrive.getHours() + "h" + (heureArrive.getMinutes()),
                                                    (result) => {
                                                        GET_USER_ITINERAIRE(
                                                            user_name,
                                                            (result) => {
                                                                setDisabled(false)
                                                                setVisible(false)

                                                                setDate("")
                                                                setData (result.data)
                                                            },
                                                            (err) => {
                                                                setDisabled(false)
                                                            }
                                                        )
                                                    },
                                                    (err) => {
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
                    </View>
                );
            }
        }
    }

    return (
        <SafeAreaView style={{ flex:1, backgroundColor:'white' }}>

            <Appbar.Header style={styles.bottom}>
                <Appbar.BackAction onPress={() => {navigation.goBack()}} />
                <Appbar.Content title="Trajets" />
            </Appbar.Header> 

            <View style = {styles.main}>
                { render_fetch (isFetching) }
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