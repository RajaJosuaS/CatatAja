import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../AppContext';
import NoteCard from '../components/NoteCard';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const { notes, toggleBookmark, deleteNote } = useContext(AppContext);
  const navigation = useNavigation();

  const handleNotePress = (note) => {
    navigation.navigate('EditNote', { note });
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
  };

  const renderNoteItem = ({ item }) => {
    const isBookmarked = notes.some((note) => note.id === item.id && note.bookmarked);
    return (
      <TouchableOpacity style={styles.noteItem} onPress={() => handleNotePress(item)}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteContent}>{item.content}</Text>
        <View style={styles.noteActions}>
          <TouchableOpacity style={styles.bookmarkButton} onPress={() => toggleBookmark(item.id)}>
            <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color={isBookmarked ? '#007AFF' : '#ccc'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteNote(item.id)}>
            <Ionicons name="trash-outline" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  noteItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bookmarkButton: {
    marginRight: 10,
  },
  deleteButton: {},
});

export default HomeScreen;
