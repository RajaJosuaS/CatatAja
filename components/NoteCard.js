import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../AppContext';

const NoteCard = ({ note, isBookmarkScreen }) => {
  const { toggleBookmark, removeBookmark } = useContext(AppContext);
  const [scaleValue] = useState(new Animated.Value(1));
  const [isBookmarked, setIsBookmarked] = useState(note.isBookmarked);

  const handleBookmarkPress = () => {
    if (isBookmarkScreen) {
      removeBookmark(note);
    } else {
      toggleBookmark(note);
      setIsBookmarked(!isBookmarked);
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.text}>{note.content}</Text>
      </View>
      <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmarkPress}>
        {isBookmarkScreen ? (
          <Ionicons name="trash" size={24} color="red" />
        ) : (
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color={isBookmarked ? 'blue' : 'black'} />
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity:0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoteCard;