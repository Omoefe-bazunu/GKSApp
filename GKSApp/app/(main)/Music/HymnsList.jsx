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
import { Picker } from "@react-native-picker/picker"; // Updated import
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import MainHeader from "../../../components/header";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";

// Static imports for JSON data
import tspData from "../../../assets/data/hymns.json";
import psalmData from "../../../assets/data/psalms.json";

// Separate caches for TSPs and Psalms
const tspCache = {
  data: null,
  timestamp: 0,
  get: function () {
    return Date.now() - this.timestamp < 300000 ? this.data : null; // 5 min cache
  },
  set: function (data) {
    this.data = data.map((hymn, index) => ({
      ...hymn,
      uniqueId: `tsp_${hymn.tsp_number}_${index}`,
    }));
    this.timestamp = Date.now();
  },
};

const psalmCache = {
  data: null,
  timestamp: 0,
  get: function () {
    return Date.now() - this.timestamp < 300000 ? this.data : null; // 5 min cache
  },
  set: function (data) {
    this.data = data.map((psalm, index) => ({
      ...psalm,
      uniqueId: `psalm_${psalm.psalm_number}_${index}`,
    }));
    this.timestamp = Date.now();
  },
};

const HymnsList = () => {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [hymns, setHymns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataType, setDataType] = useState("tsps"); // "tsps" or "psalms"

  // Optimized data loader
  const loadHymns = useCallback(async () => {
    try {
      setLoading(true);
      const cache = dataType === "tsps" ? tspCache : psalmCache;
      const cachedData = cache.get();
      if (cachedData) {
        setHymns(cachedData);
        return;
      }

      const start = Date.now();
      const data = dataType === "tsps" ? tspData : psalmData;

      cache.set(data);
      setHymns(cache.get());
      console.log(
        `Loaded ${data.length} ${dataType.toUpperCase()} in ${
          Date.now() - start
        }ms`
      );
    } catch (error) {
      console.error(`Failed to load ${dataType}:`, error);
    } finally {
      setLoading(false);
    }
  }, [dataType]);

  // Data loading strategy
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadData = async () => {
        const cache = dataType === "tsps" ? tspCache : psalmCache;
        if (!cache.get()) {
          await loadHymns();
        } else if (isActive) {
          setHymns(cache.get());
        }
      };

      loadData();
      return () => {
        isActive = false;
      };
    }, [loadHymns, dataType])
  );

  // Memoized filtered data
  const filteredHymns = useMemo(() => {
    if (!search.trim()) return hymns;

    const searchTerm = search.toLowerCase();
    return hymns.filter((item) => {
      const number =
        dataType === "tsps"
          ? item.tsp_number.toString()
          : item.psalm_number.toString().toLowerCase();
      return (
        number.includes(searchTerm) ||
        (item.title && item.title.toLowerCase().includes(searchTerm))
      );
    });
  }, [hymns, search, dataType]);

  // Optimized item renderer
  const renderItem = useCallback(
    ({ item }) => {
      const isExpanded = expandedId === item.uniqueId;
      const number = dataType === "tsps" ? item.tsp_number : item.psalm_number;
      const label = dataType === "tsps" ? `TSP ${number}` : `Psalm ${number}`;

      return (
        <View style={styles.hymnContainer} collapsable={false}>
          <TouchableOpacity
            onPress={() => setExpandedId(isExpanded ? null : item.uniqueId)}
            style={styles.hymnHeader}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.hymnTitle}>{label}</ThemedText>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#6849a7"
            />
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.hymnContent}>
              <ThemedText style={styles.hymnName}>{item.title}</ThemedText>
              {item.subtitle && (
                <ThemedText style={styles.hymnSubtitle}>
                  {item.subtitle}
                </ThemedText>
              )}
              <ThemedText style={styles.hymnMeter}>{item.meter}</ThemedText>
              {item.stanzas.map((stanza, index) => (
                <View
                  key={`${item.uniqueId}_stanza_${index}`}
                  style={styles.stanzaContainer}
                >
                  <ThemedText style={styles.stanzaNumber}>
                    {stanza.number}
                  </ThemedText>
                  <ThemedText
                    style={styles.hymnBody}
                    selectable
                    textBreakStrategy="simple"
                  >
                    {stanza.text}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}
        </View>
      );
    },
    [expandedId, dataType]
  );

  return (
    <ThemedView safe style={styles.safeArea}>
      <MainHeader />

      {/* Back arrow button */}
      <TouchableOpacity
        onPress={() => router.push("/Music")}
        style={[styles.backButton, { marginHorizontal: 10, marginTop: 10 }]}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.controlsContainer}>
        <Picker
          selectedValue={dataType}
          onValueChange={(itemValue) => {
            setDataType(itemValue);
            setHymns([]);
            setSearch("");
            setExpandedId(null);
          }}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="TSPs" value="tsps" />
          <Picker.Item label="Psalms" value="psalms" />
        </Picker>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={`Search by ${
              dataType === "tsps" ? "TSP number" : "Psalm number"
            } or title...`}
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
            accessibilityLabel={`Search ${
              dataType === "tsps" ? "TSPs" : "Psalms"
            }`}
          />
        </View>
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
            <ThemedText style={styles.emptyText}>
              No {dataType === "tsps" ? "TSPs" : "Psalms"} found
            </ThemedText>
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
  controlsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
    color: "#000",
  },
  pickerItem: {
    color: "#000",
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    backgroundColor: "#6849a7",
    borderRadius: 8,
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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  hymnSubtitle: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 8,
    color: "#555",
  },
  hymnMeter: {
    fontSize: 14,
    marginBottom: 12,
    color: "#444",
  },
  stanzaContainer: {
    marginBottom: 12,
  },
  stanzaNumber: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6849a7",
    marginBottom: 4,
  },
  hymnBody: {
    fontSize: 16,
    lineHeight: 22,
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
    color: "#fff",
  },
});

export default React.memo(HymnsList);
