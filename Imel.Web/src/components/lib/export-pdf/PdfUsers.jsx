import { StyleSheet, Text, View } from "@react-pdf/renderer";

let styles = StyleSheet.create({
  users: {
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: "#850000",
      color: "#fff",
      paddingTop: "5",
      paddingBottom: "5",
      marginTop: "-10",

      emailCol: {
        fontSize: "13",
        fontStyle: "italic",
        fontWeight: "600",
      },

      statusCol: {
        fontSize: "13",
        fontStyle: "italic",
        fontWeight: "600",
      },
    },

    mainList: {
      paddingLeft: "10",
      paddingRight: "10",
      paddingTop: "8",
      paddingBottom: "8",
      marginTop: "15",
      marginLeft: "70",
      marginRight: "70",
      backgroundColor: "#cadaf7",
      borderRadius: "3",

      userContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",

        email: {
          marginRight: "150",
          fontSize: "12",
        },
        status: {
          marginRight: "20",
          fontSize: "12",
        },
      },
    },
  },
});

export const PdfUsers = ({ users }) => {
  return (
    <>
      <View>
        <View style={styles.users.header}>
          <Text style={styles.users.header.emailCol}>Email</Text>
          <Text style={styles.users.header.statusCol}>Status</Text>
        </View>

        {users.map((user) => (
          <View key={user.id} style={styles.users.mainList}>
            <View style={styles.users.mainList.userContainer}>
              <Text style={styles.users.mainList.userContainer.email}>
                {user.email}
              </Text>
              <Text style={styles.users.mainList.userContainer.status}>
                {user.statusAsString}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};
