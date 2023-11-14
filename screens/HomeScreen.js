import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = async (text) => {
    setSearchText(text);

    const searchTextLower = text.toLowerCase();
    const filteredItems = [];
    const data = await axios.get("http://localhost:3000/api/data");
    console.log("data ya bastard", data);
    for (const section of data.data) {
      for (const product of section.d) {
        if (product.n.toLowerCase().includes(searchTextLower)) {
          filteredItems.push({ n: product.n, p: product.p });
        }
      }
    }

    if (text.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    setFilteredProducts(filteredItems);
  };

  useFocusEffect(
    React.useCallback(() => {
      // This is called when the screen is focused
      setSearchText("");
      setFilteredProducts([]);
    }, [])
  );

  //   const flattenedData = data.data.flat();
  //   const shuffledData = Array.isArray(flattenedData) ? shuffle(flattenedData.d) : [];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.groupButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create List</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for an item"
        onChangeText={(text) => handleSearch(text)}
        onSubmitEditing={() => {
          if (searchText.trim() !== "") {
            // Navigate to SearchScreen only if the search text is not empty
            navigation.navigate("SearchResult", {
              searchText,
              filteredProducts,
            });
          }
        }}
        value={searchText}
      />

      {filteredProducts.length > 0 && (
        <View style={styles.searchdropdownContainer}>
          <FlatList
            // style={{ position: 'absolute', top: 100, left: 0, right: 0, bottom: 0 }}
            data={filteredProducts.slice(0, 10)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Text style={styles.productName}>{item.n}</Text>
                <Text style={styles.productPrice}>Price: €{item.p}</Text>
              </View>
            )}
          />
        </View>
      )}

      <View style={styles.dealsContainer}>
        <Text>Best Deals</Text>
        <FontAwesome name="image" size={256} color="black" />
      </View>
      {/* <View style={styles.dealsContainer}>
        <Text>Best Deals</Text>
        <FlatList
          data={shuffledData.slice(0, 3)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text>Name: {item.n}</Text>
              <Text>Price: €{item.p}</Text>
            </View>
          )}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginTop: 80,
    marginBottom: 80,
    alignSelf: "flex-start",
    padding: 20,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  groupButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  button: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    width: "42%",
    height: 50,
    backgroundColor: "#6666ff",
    margin: 10,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  searchBar: {
    width: "90%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    alignSelf: "center",
    placeholderTextColor: "#a9a9a9",
  },
  productItem: {
    marginBottom: 10,
  },
  searchdropdownContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    position: "absolute",
    top: 380,
    zIndex: 1,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "center",
  },
  productItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  dealsContainer: {
    marginTop: 10,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "darkgray",
    borderWidth: 1,
    padding: 10,
    height: "40%",
  },
  productName: {
    fontSize: 16,
    // fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#007bff",
  },
});

export default HomeScreen;
