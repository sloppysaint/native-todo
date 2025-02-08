import { Text, View, TextInput, Pressable, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { data } from "@/data/todos";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter"
import Octicons from "@expo/vector-icons/Octicons"
import  Animated, {LinearTransition}  from "react-native-reanimated";
export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");
  const {colorScheme, setColorScheme, theme} = useContext(ThemeContext)

  const [loaded, error] = useFonts({
    Inter_500Medium, 
  })
  if(!loaded && !error){
    return null;
  } 
  const styles = createStyles(theme, colorScheme)
  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renderItem = ({item}) => (
    <View style={styles.todoItem}>
      <Text style={[styles.todoText, item.completed && styles.completedText]}
        onPress={() => toggleTodo(item.id)}
      >{item.title}</Text>
      <Pressable onPress={() => removeTodo(item.id)}>
      <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
      </Pressable>
    </View>
  )
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.inputContainer}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
        />
        <Pressable onPress={addTodo} style = {styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
        <Pressable onPress = {() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')} style = {{marginLeft: 10}}>
          {colorScheme === 'dark' ? <Octicons name = "moon" size={36} color={theme.text} selectable = {undefined} style = {{width: 36}}/>
          : <Octicons name = "sun" size={36} color={theme.text} selectable = {undefined} style = {{width: 36}}/>}
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle = {{flexGrow: 1}}
      />

    </SafeAreaView>
  );
}

function createStyles (theme, colorScheme){
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input : {
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      minWidth: 0,
      color: theme.text,
      fontFamily: "Inter_500Medium",
    },
    addButton: {
      backgroundColor: theme.button,
      padding: 10,
      borderRadius: 5,
    },
    addButtonText: {
      fontSize: 18,
      color: colorScheme === 'dark'?'black': 'white',
    },
    todoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      gap: 4,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    todoText: {
      fontSize: 18,
      color: theme.text,
      flex: 1,
      fontFamily: "Inter_500Medium",
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  })
} 