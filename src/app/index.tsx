import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
};
const COLORS = { 
  primary: "#ff0000", 
  primaryDark: "#00ff6a", 
  background: "#ffffff", 
  surface: "#8cc490", 
  border: "#1900ff", 
  text: "#0F172A", 
  textSecondary: "#64748B", 
}; 
export default function HomeScreen() {const GITHUB_JSON_URL =
  "https://raw.githubusercontent.com/SupanutKU/MyProfileApp/main/src/app/data/products.json";

const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const fetchProducts = async () => {
  setLoading(true);
  setError("");

  try {
    const url = `${GITHUB_JSON_URL}?t=${Date.now()}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: Product[] = await response.json();

    setProducts(data);
  } catch (err) {
    setProducts([]);
    setError("ไม่สามารถโหลดข้อมูลจาก GitHub ได้");
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchProducts();
}, []);

return (
  <SafeAreaView style={styles.container}>
    <StatusBar
      barStyle="dark-content"
      backgroundColor={COLORS.background}
    />

    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons
          name="menu"
          size={24}
          color={COLORS.text}
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        Products
      </Text>

      <TouchableOpacity style={styles.profileButton}>
        <Ionicons
          name="person"
          size={18}
          color="#fff"
        />
      </TouchableOpacity>
    </View>

    {/* Search */}
    <View style={styles.searchRow}>
      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={18}
          color={COLORS.textSecondary}
        />

        <TextInput
          placeholder="Search products..."
          placeholderTextColor={COLORS.textSecondary}
          style={styles.input}
        />
      </View>

      {/* Add Product */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.addButtonText}>
          + Add Product
        </Text>
      </TouchableOpacity>
    </View>

    {/* Filter */}
    <View style={styles.filterRow}>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>
          Filter ▼
        </Text>
      </TouchableOpacity>
    </View>

    {/* Product List */}
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 90 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/detail",
              params: {
                id: item.id,
                name: item.name,
                brand: item.brand,
                price: item.price,
                image: item.image,
              },
            })
          }
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.brand}>
            {item.brand}
          </Text>

          <Text style={styles.price}>
            {item.price}
          </Text>
        </TouchableOpacity>
      )}
    />

    {/* Bottom Navigation */}
    <View style={styles.bottomNav}>

      {/* Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/")}
      >
        <Ionicons
          name="home"
          size={24}
          color={COLORS.primary}
        />
        <Text
          style={[
            styles.navText,
            {
              color: COLORS.primary,
              fontWeight: "600",
            },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Add */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/add")}
      >
        <Ionicons
          name="add-circle"
          size={30}
          color={COLORS.primary}
        />
        <Text
          style={[
            styles.navText,
            {
              color: COLORS.primary,
              fontWeight: "600",
            },
          ]}
        >
          Add
        </Text>
      </TouchableOpacity>

      {/* Products */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/")}
      >
        <MaterialIcons
          name="inventory-2"
          size={24}
          color={COLORS.primary}
        />
        <Text
          style={[
            styles.navText,
            {
              color: COLORS.primary,
              fontWeight: "600",
            },
          ]}
        >
          Products
        </Text>
      </TouchableOpacity>

      {/* Categories */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/categories")}
      >
        <Ionicons
          name="folder"
          size={24}
          color={COLORS.textSecondary}
        />
        <Text style={styles.navText}>
          Categories
        </Text>
      </TouchableOpacity>

    </View>
  </SafeAreaView>
);} 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
  }, 
 
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 20, 
    paddingVertical: 18, 
    backgroundColor: COLORS.background, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.border, 
  }, 
 
  headerTitle: { 
    fontSize: 24, 
    fontWeight: "700", 
    color: COLORS.primary, 
  }, 
 
  iconButton: { 
    width: 36, 
    alignItems: "center", 
  }, 
 
  profileButton: { 
    width: 38, 
    height: 38, 
    borderRadius: 19, 
    backgroundColor: COLORS.primary, 
    justifyContent: "center", 
    alignItems: "center", 
  }, 
 
  searchRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 18, 
    paddingTop: 18, 
  }, 
 
  searchBox: { 
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: COLORS.surface, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    paddingHorizontal: 12, 
    height: 48, 
  }, 
 
  input: { 
    flex: 1, 
    marginLeft: 8, 
    color: COLORS.text, 
  }, 
 
  addButton: { 
    marginLeft: 12, 
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 18, 
    height: 48, 
    borderRadius: 12, 
    justifyContent: "center", 
    elevation: 2, 
  }, 
 
  addButtonText: { 
    color: "#fff", 
    fontWeight: "700", 
  }, 
 
  filterRow: { 
    paddingHorizontal: 18, 
    paddingTop: 15, 
  }, 
 
  filterButton: { 
    alignSelf: "flex-end", 
  }, 
 
  filterText: { 
    color: COLORS.primary, 
    fontWeight: "600", 
    fontSize: 15, 
  }, 
 
  content: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingHorizontal: 25, 
  }, 
 
  emptyTitle: { 
    marginTop: 20, 
    fontSize: 22, 
    fontWeight: "700", 
    color: COLORS.text, 
  }, 
 
  emptySub: { 
    marginTop: 8, 
    fontSize: 15, 
    textAlign: "center", 
    color: COLORS.textSecondary, 
  }, 
card: { 
  backgroundColor: "#fff", 
  borderRadius: 16, 
  padding: 14, 
  margin: 16, 
  borderWidth: 1, 
  borderColor: COLORS.border, 
}, 
 
image: { 
  width: "100%", 
  height: 180, 
  resizeMode: "contain", 
}, 
 
name: { 
  marginTop: 10, 
  fontSize: 18, 
  fontWeight: "700", 
  color: COLORS.text, 
}, 
 
brand: { 
  color: COLORS.textSecondary, 
  marginTop: 4, 
}, 
 
price: { 
  marginTop: 8, 
  fontSize: 18, 
  fontWeight: "700", 
  color: COLORS.primary, 
}, 
  bottomNav: { 
    flexDirection: "row", 
    backgroundColor: COLORS.background, 
    borderTopWidth: 1, 
    borderTopColor: COLORS.border, 
    paddingVertical: 12, 
  }, 
 
  navItem: { 
    flex: 1, 
    alignItems: "center", 
  }, 
 
  navText: { 
    marginTop: 4, 
    fontSize: 12, 
    color: COLORS.textSecondary, 
  }, 
});