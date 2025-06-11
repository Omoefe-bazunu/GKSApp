import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { db } from "../../../service/FirebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ThemedView from "../../../components/ThemedView";
import MainHeader from "../../../components/header";
import { router } from "expo-router";

const NonHymnsList = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isSeeking = useRef(false);

  const formatTime = (millis) => {
    if (!millis) return "0:00";
    const seconds = Math.floor(millis / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    const q = query(collection(db, "songs"), orderBy("title"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedSongs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSongs(fetchedSongs);
      },
      (error) => {
        console.error("Firestore error:", error);
        Alert.alert("Error", "Failed to fetch songs: " + error.message);
      }
    );
    return () => {
      unsubscribe();
      if (sound) {
        sound
          .unloadAsync()
          .catch((e) => console.error("Sound unload error:", e));
      }
    };
  }, [sound]);

  useEffect(() => {
    const filtered = songs.filter((song) =>
      song.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [search, songs]);

  const handlePlayPause = async (song) => {
    if (!song?.downloadUrl) {
      Alert.alert("Error", "No audio URL available for this song.");
      return;
    }

    setIsLoading(true);
    try {
      if (currentSong?.id === song.id && sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await sound.pauseAsync();
          setIsPaused(true);
        } else if (status.isLoaded && !status.isPlaying) {
          await sound.playAsync();
          setIsPaused(false);
        }
        setIsLoading(false);
        return;
      }

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.downloadUrl },
        { shouldPlay: true }
      );

      setSound(newSound);
      setCurrentSong(song);
      setIsPaused(false);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!isSeeking.current && status.isLoaded) {
          setPosition(status.positionMillis || 0);
          setDuration(status.durationMillis || 0);
        }
        if (status.didJustFinish) {
          setCurrentSong(null);
          setPosition(0);
          setIsPaused(false);
          newSound
            .unloadAsync()
            .catch((e) => console.error("Unload error:", e));
          setSound(null);
        }
      });
    } catch (error) {
      console.error("Playback error:", error);
      Alert.alert("Error", "Could not play the song: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeekStart = () => {
    isSeeking.current = true;
  };

  const handleSeekComplete = async (value) => {
    if (!sound || !currentSong) return;
    try {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        await sound.setPositionAsync(value);
        setPosition(value);
      }
    } catch (error) {
      console.error("Seek error:", error);
    } finally {
      isSeeking.current = false;
    }
  };

  const renderSong = ({ item }) => {
    const isCurrentSong = currentSong?.id === item.id;
    return (
      <View style={[styles.songCard, isCurrentSong && styles.activeSongCard]}>
        <View style={styles.songHeader}>
          <TouchableOpacity
            onPress={() => handlePlayPause(item)}
            disabled={isLoading && isCurrentSong}
            style={styles.playButton}
          >
            {isLoading && isCurrentSong ? (
              <ActivityIndicator size="small" color="#3b2772" />
            ) : (
              <Ionicons
                name={isCurrentSong ? (isPaused ? "play" : "pause") : "play"}
                size={24}
                color="#3b2772"
              />
            )}
          </TouchableOpacity>
          <View style={styles.songInfo}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title || "Untitled"}
            </Text>
            {item.artist && (
              <Text style={styles.artist} numberOfLines={1}>
                {item.artist}
              </Text>
            )}
          </View>
        </View>

        {isCurrentSong && (
          <View style={styles.progressContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingStart={handleSeekStart}
              onValueChange={setPosition}
              onSlidingComplete={handleSeekComplete}
              minimumTrackTintColor="#3b2772"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#3b2772"
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>
                -{formatTime(duration - position)}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <MainHeader />
      <TouchableOpacity
        onPress={() => router.push("/Music")}
        style={[styles.backButton, { marginHorizontal: 10, marginTop: 10 }]}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search songs..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id}
        renderItem={renderSong}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No songs found</Text>
        }
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 45,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    marginTop: 10,
    backgroundColor: "#f9f9f9",
  },
  list: {
    paddingBottom: 100,
  },
  songCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeSongCard: {
    backgroundColor: "#f0e6ff",
  },
  songHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  playButton: {
    marginRight: 12,
    padding: 4,
  },
  songInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  artist: {
    fontSize: 13,
    color: "#666",
  },
  progressContainer: {
    width: "100%",
  },
  slider: {
    width: "100%",
    height: 30,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  timeText: {
    fontSize: 11,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#fff",
  },
});

export default NonHymnsList;
