import React from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";

const SearchResultScreen = ({ route }) => {
  const { searchText, filteredProducts } = route.params;

  return (
    <View>
      <Text style={styles.title}>
        Search Results for <Text style={styles.boldText}>"{searchText}"</Text>
      </Text>
      <ScrollView>
        <View style={styles.searchresultContainer}>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Text style={styles.productName}>{item.n}</Text>
                <Text style={styles.productPrice}>€{item.p}</Text>
                {/* <Text style={styles.supermarketName}>{item.supermarket}</Text> */}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    // textAlign: "center",
    marginTop: 20,
    padding: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  searchresultContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "center",
    height: "70%",
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  productName: {
    fontSize: 16,
	width: "70%",
  },
  productPrice: {
    fontSize: 14,
    color: "#007bff",
  },
//   supermarketName: {
//     fontSize: 14,
//     color: "black", // You can change the color as per your preference
//   },
});

export default SearchResultScreen;
