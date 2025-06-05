import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import MainHeader from "../../../components/header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";

// Persistent cache without size limits
const hymnCache = {
  data: null,
  timestamp: 0,
  get: function () {
    return Date.now() - this.timestamp < 300000 ? this.data : null; // 5 min cache
  },
  set: function (data) {
    // Add unique IDs if they don't exist
    this.data = data.map((hymn, index) => ({
      ...hymn,
      uniqueId: hymn.id || `${hymn.number}_${index}`,
    }));
    this.timestamp = Date.now();
  },
};

const HymnsList = () => {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [hymns, setHymns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Optimized data loader
  const loadHymns = useCallback(async () => {
    try {
      setLoading(true);
      const cachedData = hymnCache.get();
      if (cachedData) {
        setHymns(cachedData);
        return;
      }

      const start = Date.now();
      const module = await import("../../../assets/data/hymns.json");
      const data = module.default || module;

      // Set all hymns at once with unique IDs
      hymnCache.set(data);
      setHymns(hymnCache.get());
      console.log(`Loaded ${data.length} hymns in ${Date.now() - start}ms`);
    } catch (error) {
      console.error("Failed to load hymns:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Data loading strategy
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadData = async () => {
        if (!hymnCache.get()) {
          await loadHymns();
        } else if (isActive) {
          setHymns(hymnCache.get());
        }
      };

      loadData();
      return () => {
        isActive = false;
      };
    }, [loadHymns])
  );

  // Memoized filtered data
  const filteredHymns = useMemo(() => {
    if (!search.trim()) return hymns;

    const searchTerm = search.toLowerCase();
    return hymns.filter(
      (hymn) =>
        hymn.number.toLowerCase().includes(searchTerm) ||
        (hymn.title && hymn.title.toLowerCase().includes(searchTerm))
    );
  }, [hymns, search]);

  // Optimized item renderer
  const renderItem = useCallback(
    ({ item }) => {
      const isExpanded = expandedId === item.uniqueId;

      return (
        <View style={styles.hymnContainer} collapsable={false}>
          <TouchableOpacity
            onPress={() => setExpandedId(isExpanded ? null : item.uniqueId)}
            style={styles.hymnHeader}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.hymnTitle}>{item.number}</ThemedText>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#6849a7"
            />
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.hymnContent}>
              <ThemedText style={styles.hymnName}>{item.title}</ThemedText>
              <ThemedText
                style={styles.hymnBody}
                selectable
                textBreakStrategy="simple"
              >
                {item.content}
              </ThemedText>
            </View>
          )}
        </View>
      );
    },
    [expandedId]
  );

  return (
    <ThemedView safe style={styles.safeArea}>
      <MainHeader />

      {/* Up arrow button - unchanged from your request */}
      <TouchableOpacity
        onPress={() => router.push("/Music")}
        style={[styles.backButton, { marginHorizontal: 10, marginTop: 10 }]}
      >
        <Ionicons name="arrow-up" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by TSP number..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {loading && !hymns.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6849a7" />
        </View>
      ) : (
        <FlatList
          data={filteredHymns}
          renderItem={renderItem}
          keyExtractor={(item) => item.uniqueId}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={7}
          removeClippedSubviews={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
          ListEmptyComponent={
            <ThemedText style={styles.emptyText}>No hymns found</ThemedText>
          }
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
    color: "#000",
    fontSize: 16,
  },
  scrollContainer: {
    paddingBottom: 70,
    paddingHorizontal: 15,
  },
  hymnContainer: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
    borderColor: "#ddd",
    borderWidth: StyleSheet.hairlineWidth,
  },
  hymnHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  hymnTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6849a7",
    flexShrink: 1,
  },
  hymnContent: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  hymnName: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  hymnBody: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default React.memo(HymnsList);
