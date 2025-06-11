import React, { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import { db } from "../../service/FirebaseConfig";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  getDocs,
} from "firebase/firestore";
import MainHeader from "../../components/header";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10;

  // Fetch unique years for filter
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const q = query(collection(db, "QuizQA"), orderBy("year"));
        const snapshot = await getDocs(q);
        const uniqueYears = [
          ...new Set(snapshot.docs.map((doc) => doc.data().year.toString())),
        ].sort();
        setYears(["All", ...uniqueYears]);
      } catch (error) {
        console.error("Error fetching years:", error.message);
        Alert.alert("Error", "Failed to load years.");
      }
    };
    fetchYears();
  }, []);

  // Fetch questions based on selected year
  const fetchQuestions = async (isLoadMore = false) => {
    if (loading || (!hasMore && isLoadMore)) return;
    setLoading(true);

    try {
      let q;
      if (selectedYear === "All") {
        q = query(collection(db, "QuizQA"), orderBy("year"), limit(PAGE_SIZE));
      } else {
        q = query(
          collection(db, "QuizQA"),
          where("year", "==", parseInt(selectedYear)),
          orderBy("year"),
          limit(PAGE_SIZE)
        );
      }

      if (isLoadMore && lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const fetchedQuestions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuestions((prev) =>
        isLoadMore ? [...prev, ...fetchedQuestions] : fetchedQuestions
      );
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching questions:", error.message);
      Alert.alert("Error", "Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  // Reset and fetch when year changes
  useEffect(() => {
    setQuestions([]);
    setLastDoc(null);
    setHasMore(true);
    fetchQuestions();
  }, [selectedYear]);

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchQuestions(true);
    }
  };

  const renderQuestion = ({ item }) => (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.yearText}>{item.year}</ThemedText>
      <ThemedText style={styles.contentText}>{item.content}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <MainHeader />
      <Picker
        selectedValue={selectedYear}
        onValueChange={(value) => setSelectedYear(value)}
        style={styles.picker}
      >
        {years.map((year) => (
          <Picker.Item key={year} label={year} value={year} />
        ))}
      </Picker>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={renderQuestion}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>No questions found</ThemedText>
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#3b2772"
              style={styles.loader}
            />
          ) : hasMore ? (
            <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
              <ThemedText style={styles.loadMoreText}>Load More</ThemedText>
            </TouchableOpacity>
          ) : null
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
  picker: {
    height: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "90%",
    marginBottom: 16,
    paddingHorizontal: 12,
    color: "#333",
    alignSelf: "center",
    marginTop: 20,
    overflow: "hidden",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  yearText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3b2772",
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: "#333",
    whiteSpace: "pre-wrap",
    lineHeight: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#fff",
  },
  loadMoreButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3b2772",
    borderRadius: 8,
    marginTop: 16,
  },
  loadMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  loader: {
    marginVertical: 16,
  },
});

export default Quiz;
