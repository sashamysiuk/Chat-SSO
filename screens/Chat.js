import React, {useEffect, useState} from 'react';
import {collection, getFirestore, getDocs} from "firebase/firestore";
import {addDoc} from 'firebase/firestore'
import Button from "../components/Button"
import { StyleSheet, View, TextInput, FlatList, Text, ScrollView} from 'react-native';
import { serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useForm, Controller } from 'react-hook-form';
import {db} from "../FirebaseConfig";

  
      const Chat = () => {
        //const route = useRoute();
        //const {userInfo} = route.params;
 
        const coll = collection(db, "Chat");

        const { control, handleSubmit, setValue } = useForm();
        const [messages, setMessages] = useState([]);

        useEffect(() => {
          const q = query(coll, orderBy('TimeStamp', 'asc'));
          const unsubscribe = onSnapshot(q,(snapshot) => {
            let Messages = [];
          snapshot.docs.forEach((doc) => {
            Messages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(Messages);
          })
          return () => unsubscribe();
        },[]);

              const AddDocument = async (data) => {
                await addDoc(coll, {
                  Text: data.Text,
                  TimeStamp: serverTimestamp(),
                  UserName:"user"
                });
              };
                    
                const SendMessage = async (data) => {
                  await AddDocument(data);
                  setValue('Text', '');
              };
              

        return (
          <View style={{maxHeight:"90%"}}>
            <ScrollView>
            {messages.map((mes) => (
              <View style={styles.messageContainer} key={mes.id}>
              <Text style={styles.timestamp}>{mes.TimeStamp && mes.TimeStamp.toDate().toLocaleTimeString()}</Text>
                  <Text style={styles.username}>{mes.UserName}:</Text>
                  <Text style={styles.text}>{mes.Text}</Text>
            </View>
             ))}
             </ScrollView>
              <View>
              <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputContainer}
                    placeholder="Start typing..."
                    onBlur={onBlur}
                    onChangeText={(text) => setValue('Text', text)}
                    value={value}/>
                )}
                name="Text"
                defaultValue=""/>
                <Button title="Send message" onPress={handleSubmit(SendMessage)} />
                  </View>
            </View>
            )}

       const styles = StyleSheet.create({
        inputContainer: {
          justifyContent: 'center',
          marginBottom: 30,
          marginTop: 50,
          width: '80%',
      },
      container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        top:650
      },
      messageContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      timestamp: {
        fontSize: 12,
        color: '#888',
      },
      username: {
        fontWeight: 'bold',
        marginRight: 5,
      },
      text: {
        fontSize: 16,
      },
    })   
    
    export default Chat;
