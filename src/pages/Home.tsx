import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskTitle = tasks.find(task => task.title === newTaskTitle);

    if (taskTitle) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome!")
    }else{
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false 
      } 
      setTasks(oldState => [...oldState, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({...task}))
    const tasksDone = updateTasks.find(task => task.id === id);
    if (tasksDone?.done === true) {
      tasksDone.done = false;
    }else if(tasksDone?.done === false){
      tasksDone.done = true;
    }
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item", 
      "Tem certeza que você deseja remover esse item?", 
      [
        {
          text: "Sim",
          onPress: () => setTasks( tasks => tasks.filter(task => task.id !== id)) 
        },
        {
          text: "Não",
          onPress: () => console.log("Não Pressed")
        }  
      ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updateTasks = tasks.map(task => ({...task}))
    const tasksTitle = updateTasks.find(task => task.id === taskId);
    
    if (!tasksTitle) {
      return;
    }
    
    tasksTitle.title = taskNewTitle;
  
    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})