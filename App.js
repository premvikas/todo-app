import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Task from './components/Task';

export default function App() {
  const [task, setTask]= useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask= () => {
    Keyboard.dismiss();
    console.log("task", task);
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>
          Today's Task
        </Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                  <Task  text={item}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View> 

      <KeyboardAvoidingView
       behavior={Platform.OS === "ios"? "padding" :"height"}
        style={styles.writeTaskManager} >

        <TextInput style={styles.input} placeholder={"write a task"} value={task} onChangeText={text=> setTask(text)} /> 
        <TouchableOpacity onPress={()=> handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>  
    </View>
  );
}

const styles = StyleSheet.create({
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  writeTaskManager:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input:{
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#dfef76',
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle:{
    fontSize:24,
    fontWeight:'bold'
  },
  sectionTitle:{},
  items:{
    marginTop: 30
  }
});
