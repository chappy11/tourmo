import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet,KeyboardAvoidingView ,Text } from 'react-native';
import { Color } from '../utils/Themes';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Screen = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex:1}}>
        <ScrollView style={{flex:1}}>
        {props.children}
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.primary,
   
  },
});

export default Screen;