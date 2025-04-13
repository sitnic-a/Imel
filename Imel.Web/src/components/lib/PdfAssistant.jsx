import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { getUsersReadyToExport } from "../../redux-toolkit/features/exportSlice";
import { application } from "../../application";

let styles = StyleSheet.create({
  body: {
    paddingTop: "35",
    paddingBottom: "105",
  },

  note: {
    color: "#f00",
    fontSize: "12",
    maxWidth: "400",
    marginTop: "15",
    marginLeft: "80",
    textAlign: "center",
  },

  header: {
    padding: "20",
    textAlign: "center",
    marginBottom: 5,

    title: {
      fontSize: "18",
      marginTop: 10,
      fontWeight: 900,
      marginBottom: 10,
      textDecoration: "underline",
      color: "#777",
    },

    date: {
      fontSize: "20",
      color: "#a2a2a2",

      today: {
        fontSize: "18",
        fontWeight: "bold",
      },
    },

    subtitle: {
      fontSize: "13.8",
      fontStyle: "italic",
      textAlign: "justify",
      marginRight: 30,
      marginLeft: 30,
      marginTop: "20",
      color: "#375895",
    },
  },

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

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const PdfAssistant = () => {
  //   let dispatch = useDispatch();
  let [users, setUsers] = useState([]);
  let todaysDate = moment().format("MMMM DD, YYYY");
  //   let { dbUsers } = useSelector((store) => store.export);

  useEffect(() => {
    let fetchUsers = async () => {
      let request = await fetch(`${application.url}/export/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await request.json().then((data) => {
        console.log("Data RSP ", data);
        setUsers(data.response);
      });
    };

    fetchUsers();
  }, []);

  //   const Rows = () => {
  //     // var rows =

  //     return (

  //     );
  //   };

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.header.title}>Lista korisnika</Text>
          <Text style={styles.header.date}>
            Datum <Text style={styles.header.date.today}>{todaysDate}</Text>
          </Text>
          <Text style={styles.header.subtitle}>
            Ovdje možete pregledati sve korisnike koji koriste trenutno
            aplikaciju Imel d.o.o te njihovu aktivnost.
          </Text>
          <Text style={styles.note}>
            Dokument trenutno nije moguce uredivati te je namijenjen iskljucivo
            za pregledanje
          </Text>
        </View>

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

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PdfAssistant;
