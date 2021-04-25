/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * Yersultan Assylbekov, 20MD0123
 */

import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Button,
  TextInput,
  AsyncStorage,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default class App extends React.Component {
  state = {
    text: "",
    tasks: []
  };

  handleInsert = () => {
    let notEmpty = this.state.text.trim().length > 0;
    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text }),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };

  handleDelete = index => {
    this.setState(
      lastState => {
        let tasks = lastState.tasks.slice();
        tasks.splice(index, 1);
        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

  handleTextChange = text => {
    this.setState({ text: text });
  };

  render() {
    return (
      <View style={[styles.container]}>
        <FlatList style={styles.recyclerView}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.adapterItem}>
                <Text style={styles.item}>
                  {item.text}
                </Text>
                <Button style={[styles.button]} title="Delete" onPress={() => this.handleDelete(index)} />
              </View>
            </View>} />
        <TextInput
          style={styles.textStyle} onChangeText={this.handleTextChange} onSubmitEditing={this.handleInsert}
          placeholder="Write task new name.." value={this.state.text} />
      </View>
    );
  }
};

let Tasks = {
  save(tasks) {
    AsyncStorage.setItem("Tasks", this.toStringDivider(tasks));
  },
  toArray(tasks, callback) {
    return callback(
      tasks ? tasks.split("$").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  toStringDivider(tasks) {
    return tasks.map(task => task.text).join("$");
  },
  all(listener) {
    return AsyncStorage.getItem("Tasks", (err, tasks) =>
      this.toArray(tasks, listener)
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "#F7CAC9",
    padding: 12,
    paddingBottom: 40
  },
  recyclerView: {
    width: "95%",
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    marginEnd: 20,
    marginTop: 8
  },
  adapterItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#7FCDCD",
    alignItems: "center",
    padding: 10,
    paddingEnd: 12,
    marginTop: 4,
    borderRadius: 10
  },
  button: {
    backgroundColor: "#DFCFBE"
  },
  textStyle: {
    paddingEnd: 10,
    paddingStart: 18,
    height: 54,
    fontSize: 18,
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%"
  }
});