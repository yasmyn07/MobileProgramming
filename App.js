import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

/* ---------------- FIREBASE CONFIG ---------------- */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "selah-vastra-admin.firebaseapp.com",
  databaseURL:
    "https://selah-vastra-admin-default-rtdb.firebaseio.com",
  projectId: "selah-vastra-admin",
  storageBucket: "selah-vastra-admin.firebasestorage.app",
  messagingSenderId: "940314115804",
  appId: "1:940314115804:web:2aa8eb1ddf06f0079afe19",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [screen, setScreen] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCount, setLoginCount] = useState(0);

  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  const monthlySales = [80000, 120000, 60000, 140000];
  const maxHeight = 150;
  const barAnims = useRef(monthlySales.map(() => new Animated.Value(0))).current;

  /* 🔥 Realtime Login Count */
  useEffect(() => {
    const loginRef = ref(database, "logins");
    onValue(loginRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLoginCount(Object.keys(data).length);
      else setLoginCount(0);
    });
  }, []);

  /* 🔥 Realtime Notes */
  useEffect(() => {
    const notesRef = ref(database, "adminNotes");
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setNotes(Object.values(data).reverse());
      else setNotes([]);
    });
  }, []);

  /* 🔥 Animate Bars on Load */
  useEffect(() => {
    Animated.stagger(
      150,
      barAnims.map((anim, index) =>
        Animated.timing(anim, {
          toValue: (monthlySales[index] / 150000) * maxHeight,
          duration: 600,
          useNativeDriver: false,
        })
      )
    ).start();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter email and password");
      return;
    }

    push(ref(database, "logins"), {
      email,
      timestamp: Date.now(),
    });

    Alert.alert("Success", "Logged in successfully 🎉");

    setScreen("dashboard");
    setEmail("");
    setPassword("");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);

    Animated.timing(dropdownAnim, {
      toValue: menuOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const addNote = () => {
    if (!noteText.trim()) return;

    push(ref(database, "adminNotes"), {
      text: noteText,
      timestamp: Date.now(),
    });

    setNoteText("");
  };

  /* ---------------- LOGIN ---------------- */

  if (screen === "login") {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Selah Vastra Admin</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  /* ---------------- DASHBOARD ---------------- */

  const stats = [
    { title: "Total Sales", value: "₹2,45,800" },
    { title: "Orders", value: "3220" },
    { title: "Products", value: "150" },
    { title: "Customers", value: "1280" },
    { title: "Total Logins", value: loginCount },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>Selah Vastra</Text>

          <TouchableOpacity onPress={toggleMenu}>
            <Image
              source={{
                uri: "https://www.shopethnos.com/cdn/shop/products/8_2cb7250b-44a3-4e3a-9c19-7c2273cb8e55.jpg?v=1742863462&width=1080",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Dropdown */}
        {menuOpen && (
          <Animated.View
            style={[
              styles.dropdown,
              {
                opacity: dropdownAnim,
                transform: [
                  {
                    translateY: dropdownAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.dropdownItem}>Profile</Text>
            <Text style={styles.dropdownItem}>Settings</Text>
            <TouchableOpacity
              onPress={() => {
                setScreen("login");
                setMenuOpen(false);
              }}
            >
              <Text style={[styles.dropdownItem, { color: "red" }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Stats */}
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

          <View style={styles.chartWrapper}>
            <View style={styles.yAxis}>
              <Text style={styles.axisLabel}>150k</Text>
              <Text style={styles.axisLabel}>100k</Text>
              <Text style={styles.axisLabel}>50k</Text>
              <Text style={styles.axisLabel}>0</Text>
            </View>

            <View style={styles.chartArea}>
              {barAnims.map((anim, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.bar,
                    { height: anim },
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.xAxis}>
            <Text style={styles.axisLabel}>Jan</Text>
            <Text style={styles.axisLabel}>Feb</Text>
            <Text style={styles.axisLabel}>Mar</Text>
            <Text style={styles.axisLabel}>Apr</Text>
          </View>
        </View>

        {/* Admin Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin Notes</Text>

          <View style={styles.noteInputRow}>
            <TextInput
              placeholder="Write admin note..."
              value={noteText}
              onChangeText={setNoteText}
              style={styles.noteInput}
            />
            <TouchableOpacity style={styles.noteBtn} onPress={addNote}>
              <Text style={{ color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>

          {notes.map((note, index) => (
            <Text key={index} style={styles.noteItem}>
              • {note.text}
            </Text>
          ))}
        </View>

        {/* Top Selling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Selling Products</Text>
          <View style={styles.rowLine}>
            <Text>1. Silk Saree</Text>
            <Text style={styles.bold}>₹3,499</Text>
          </View>
          <View style={styles.rowLine}>
            <Text>2. Designer Kurti</Text>
            <Text style={styles.bold}>₹1,799</Text>
          </View>
          <View style={styles.rowLine}>
            <Text>3. Embroidered Lehenga</Text>
            <Text style={styles.bold}>₹5,999</Text>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <View style={styles.rowLine}>
            <Text>Afrin Shrestha #1023</Text>
            <Text style={styles.muted}>₹1,599 Delivered</Text>
          </View>
          <View style={styles.rowLine}>
            <Text>Ashika #1022</Text>
            <Text style={styles.muted}>₹2,799 Pending</Text>
          </View>
          <View style={styles.rowLine}>
            <Text>Monica Khadka #1021</Text>
            <Text style={styles.muted}>₹3,200 Shipped</Text>
          </View>
        </View>

        {/* New Customers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Customers</Text>

          <View style={styles.customerRow}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&s",
              }}
              style={styles.smallAvatar}
            />
            <Text>Manisha Shrestha</Text>
          </View>

          <View style={styles.customerRow}>
            <Image
              source={{
                uri: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg",
              }}
              style={styles.smallAvatar}
            />
            <Text>Sita Bhujel</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f2f2f7" },

  loginContainer: { flex: 1, justifyContent: "center", padding: 35 },

  loginTitle: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e5ea",
    padding: 14,
    borderRadius: 14,
    marginBottom: 15,
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: { color: "white", fontWeight: "600" },

  header: {
    backgroundColor: "#007AFF",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  brand: { fontSize: 22, color: "white", fontWeight: "700" },

  avatar: { width: 42, height: 42, borderRadius: 21 },

  dropdown: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 14,
    padding: 12,
    elevation: 5,
  },

  dropdownItem: { paddingVertical: 10, fontSize: 15 },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },

  card: {
    backgroundColor: "white",
    width: "48%",
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTitle: { color: "#8e8e93" },

  cardValue: { fontSize: 18, fontWeight: "700", marginTop: 6 },

  section: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 12 },

  chartWrapper: { flexDirection: "row", marginTop: 10 },

  yAxis: { justifyContent: "space-between", marginRight: 10, height: 150 },

  chartArea: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flex: 1,
    height: 150,
  },

  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 40,
  },

  axisLabel: { fontSize: 12, color: "#8e8e93" },

  bar: {
    width: 22,
    backgroundColor: "#007AFF",
    borderRadius: 6,
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
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },

  noteInputRow: { flexDirection: "row", marginBottom: 10 },

  noteInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e5ea",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },

  noteBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 14,
    justifyContent: "center",
    marginLeft: 8,
    borderRadius: 12,
  },

  noteItem: { marginVertical: 4 },

  muted: { color: "#8e8e93" },

  bold: { fontWeight: "600" },
});
