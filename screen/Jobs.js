import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Button, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import hook useNavigation từ react-navigation/native
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Jobs = ({ route }) => {
  const [newJob, setNewJob] = useState('');
  const [jobs, setJobs] = useState([]);
  const cJobs = firestore().collection("JOBS");
  const currentUser = auth().currentUser;
  const { fullname } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = cJobs.onSnapshot(snapshot => {
      const result = [];
      snapshot.forEach(job => {
        const { title, complete } = job.data();
        result.push({ id: job.id, title, complete });
      });
      setJobs(result);
    });
    return () => unsubscribe();
  }, []);

  const updateJob = ({ id, complete }) => {
    cJobs.doc(id)
      .update({ complete: !complete })
      .then(() => Alert.alert("Đã cập nhật"));
  };

  const renderItem = ({ item }) => {
    const { id, title, complete } = item;
    return (
      <View style={styles.itemContainer}>
        <Button onPress={() => updateJob(item)} style={styles.jobButton}>
          <Text style={styles.boldText}>{title}</Text>
        </Button>
      </View>
    );
  };

  const addNewJob = () => {
    if (newJob.trim() === '') {
      Alert.alert("Vui lòng nhập tên công việc");
      return;
    }

    cJobs.add({ title: newJob.trim(), complete: false })
      .then(() => {
        Alert.alert("Đã thêm công việc mới");
        setNewJob('');
      })
      .catch(error => {
        Alert.alert("Lỗi khi thêm công việc", error.message);
      });
  };

  // Hàm xử lý logout
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert("Lỗi khi đăng xuất", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={`Hello! ${fullname}`} titleStyle={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }} />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="New Job"
          value={newJob}
          onChangeText={setNewJob}
        />
        <Button mode="contained-tonal" onPress={addNewJob} style={styles.addButton} labelStyle={{ color: 'white' }} >
          Add
        </Button>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: '#0099CC'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 25,
  },
  input: {
    width: '70%',
    marginRight: 10,
    backgroundColor: 'white'
  },
  addButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: "#0099CC",
  },
  jobButton: {
    marginBottom: 5,
  },
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
