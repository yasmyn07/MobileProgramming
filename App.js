import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

export default function App() {
  const stats = [
    { title: "Total Sales", value: "₹2,45,800" },
    { title: "Orders", value: "3220" },
    { title: "Products", value: "150" },
    { title: "Customers", value: "1280" },
  ];

  const topProducts = [
    { name: "Silk Saree", price: "₹3,499" },
    { name: "Designer Kurti", price: "₹1,799" },
    { name: "Embroidered Lehenga", price: "₹5,999" },
  ];
  
  const recentOrders = [
    { name: "Afrin Shrestha #1023", detail: "₹1,599 Delivered" },
    { name: "Ashika #1022", detail: "₹2,799 Pending" },
    { name: "Monica Khadka #1021", detail: "₹3,200 Shipped" },
  ];

  const newCustomers = [
    {
      name: "Manisha Shrestha",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&s",
    },
    {
      name: "Sita Bhujel",
      avatar:
        "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>Selah Vastra</Text>

          <View style={styles.adminBox}>
            <Text style={styles.adminText}>Admin</Text>
            <Image
              source={{
                uri: "https://www.shopethnos.com/cdn/shop/products/8_2cb7250b-44a3-4e3a-9c19-7c2273cb8e55.jpg?v=1742863462&width=1080",
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((item) => (
            <View key={item.title} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Sales Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales Analytics</Text>
          <View style={styles.analyticsBox}>
            <Text style={styles.muted}>
              📈 Chart Area (Add chart library later)
            </Text>
          </View>
        </View>

        {/* Top Selling Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Selling Products</Text>
          {topProducts.map((p, index) => (
            <View key={p.name} style={styles.rowLine}>
              <Text>
                {index + 1}. {p.name}
              </Text>
              <Text style={styles.bold}>{p.price}</Text>
            </View>
          ))}
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {recentOrders.map((o) => (
            <View key={o.name} style={styles.rowLine}>
              <Text>{o.name}</Text>
              <Text style={styles.muted}>{o.detail}</Text>
            </View>
          ))}
        </View>

        {/* New Customers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Customers</Text>
          {newCustomers.map((c) => (
            <View key={c.name} style={styles.customerRow}>
              <Image source={{ uri: c.avatar }} style={styles.smallAvatar} />
              <Text>{c.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f1eb",
  },

  container: {
    flex: 1,
  },

  content: {
    paddingBottom: 80, // ensures full scroll on iPhone
  },

  header: {
    backgroundColor: "#8b6b3e",
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },

  adminBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  adminText: {
    color: "white",
    marginRight: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },

  card: {
    backgroundColor: "white",
    width: "48%",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
  },

  cardTitle: {
    color: "#888",
  },

  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },

  section: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: 12,
    padding: 15,
    borderRadius: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  analyticsBox: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  rowLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  customerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  smallAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },

  muted: {
    opacity: 0.7,
  },

  bold: {
    fontWeight: "bold",
  },
});