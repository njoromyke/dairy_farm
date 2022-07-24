import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Appbar,
  Chip,
  Divider,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const UserList = () => {
  const { colors } = useTheme();
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const userRef = collection(db, "users");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const us = await getDocs(userRef);
      setUsers(us.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Users" />
      </Appbar>
      {loading && <Loader />}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <List.Item
              title={item.name}
              description={() => (
                <View>
                  <Text>{item.email}</Text>
                  <Text>
                    {item.isAdmin ? (
                      <Chip
                        icon={() => (
                          <Feather
                            name="user-check"
                            size={20}
                            color={colors.primary}
                          />
                        )}
                      >
                        Admin
                      </Chip>
                    ) : (
                      <Chip
                        icon={() => (
                          <Feather
                            name="user-x"
                            size={20}
                            color={colors.notification}
                          />
                        )}
                      >
                        User
                      </Chip>
                    )}
                  </Text>
                </View>
              )}
              right={() => (
                <List.Icon
                  icon="account-circle"
                  color={colors.primary}
                  size={30}
                  style={{ marginRight: 10 }}
                />
              )}
            />
            <Divider />
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default UserList;
