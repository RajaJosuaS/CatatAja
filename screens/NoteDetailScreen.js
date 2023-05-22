// NoteDetailScreen.js
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../AppContext';
import { Ionicons } from '@expo/vector-icons';

const NoteDetailScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const { notes, setNotes } = useContext(AppContext);

  const handleBookmarkPress = () => {
    const updatedNotes = notes.map((n) => {
      if (n.id === note.id) {
        return { ...n, isBookmarked: !n.isBookmarked };
      } else {
        return n;
      }
    });
    setNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookmarkContainer} onPress={() => handleBookmarkPress()}>
          {note.isBookmarked ? (
            <Ionicons name="bookmark" size={24} color="blue" />
          ) : (
            <Ionicons name="bookmark-outline" size={24} color="blue" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.text}>{note.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
  bookmarkContainer: {
    marginLeft: 10,
  },
});

export default NoteDetailScreen;
