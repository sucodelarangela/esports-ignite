import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    // View seria equivalente a uma div
    <View style={styles.container}>
      <Text >Hello, React Native</Text>
      <Button title='Send 1' />
      <Button title='Send 2' />
      <Button title='Send 3' />
      <Button title='Hello, React Native' />
      <StatusBar style="auto" />
    </View>
  );
}

// A estilização é similar ao styled.components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22
  }
});

