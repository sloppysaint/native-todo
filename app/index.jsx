import { Text, View, TextInput, Pressable, SafeAreaView} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import {data} from "@/data/todos"
export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id))
  const [text, setText] = useState('')

  const addTodo = () => {
    if(text.trim()){
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{id: newId, title: text, completed: false}, ...todos])
      setText('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id? {...todo, completed:!todo.completed} : todo))
  }
  const removeTodo = (id) =>{
    setTodos(todos.filter(todo => todo.id!== id))
  }
  return (
    <SafeAreaView style = {styles.container}>
      <View style={{flexDirection: 'row', marginBottom: 10, justifyContent:'space-between', alignItems: 'center'}}>
        <TextInput value={text} onChangeText={setText} placeholder='Enter todo'/>
        <Pressable onPress={addTodo}><Text>Add</Text></Pressable>
      </View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </SafeAreaView>
  );
}
