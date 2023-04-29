import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bookmarkedNotes, setBookmarkedNotes] = useState([]);

  useEffect(() => {
    async function loadNotes() {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    }
    loadNotes();
  }, []);

  useEffect(() => {
    async function loadLogin() {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
        setLoggedIn(true);
      }
    }
    loadLogin();
  }, []);

  async function handleLogin() {
    await AsyncStorage.setItem('email', email);
    setLoggedIn(true);
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('email');
    setLoggedIn(false);
  }

  async function handleCreateNote() {
    const newNotes = [...notes, { text: newNote }];
    setNotes(newNotes);
    setNewNote('');
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  }

  async function handleEditNote(index, text) {
    const newNotes = [...notes];
    newNotes[index].text = text;
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  }

  async function handleDeleteNote(index) {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  }

  function handleBookmarkNote(index) {
    const newBookmarkedNotes = [...bookmarkedNotes];
    if (newBookmarkedNotes.includes(index)) {
      newBookmarkedNotes.splice(newBookmarkedNotes.indexOf(index), 1);
    } else {
      newBookmarkedNotes.push(index);
    }
    setBookmarkedNotes(newBookmarkedNotes);
  }

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Password:</Text>
        <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.notes}>
        {notes.map((note, index) => (
          <View style={styles.note} key={index}>
            <TextInput style={styles.noteText} value={note.text} onChangeText={(text) => handleEditNote(index, text)} />
            <TouchableOpacity style={styles.bookmark} onPress={() => handleBookmarkNote(index)}>
              <Ionicons name={bookmarkedNotes.includes(index) ? 'star' : 'star-outline'} size={24} color={bookmarkedNotes.includes(index) ? 'gold' : 'black'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete} onPress={() => handleDeleteNote(index)}>
              <Ionicons name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.newNote}>
        <TextInput style={styles.newNoteText} placeholder="New note" value={newNote} onChangeText={setNewNote} />
        <TouchableOpacity style={styles.addNote} onPress={handleCreateNote}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  notes: {
    flex: 1,
    marginBottom: 20,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  noteText: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  bookmark: {
    marginRight: 10,
  },
  delete: {
    marginRight: 10,
  },
  newNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  newNoteText: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  addNote: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logout: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 20,
  },
});