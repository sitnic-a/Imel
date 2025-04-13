import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import React, { useEffect, useReducer } from "react";

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
  let todaysDate = moment().format("MMMM DD, YYYY");

  let users = [
    {
      id: 1,
      email: "admir@gmail.com",
      status: "Aktivan",
    },
    {
      id: 2,
      email: "adm@gmail.com",
      status: "Aktivan",
    },
    {
      id: 3,
      email: "admirrr@gmail.com",
      status: "Neaktivan",
    },
    {
      id: 4,
      email: "dijana@gmail.com",
      status: "Aktivan",
    },
    {
      id: 5,
      email: "admir@gmail.com",
      status: "Aktivan",
    },
    {
      id: 6,
      email: "adm@gmail.com",
      status: "Aktivan",
    },
    {
      id: 7,
      email: "admirrr@gmail.com",
      status: "Neaktivan",
    },
    {
      id: 8,
      email: "dijana@gmail.com",
      status: "Aktivan",
    },
    {
      id: 9,
      email: "admir@gmail.com",
      status: "Aktivan",
    },
    {
      id: 10,
      email: "adm@gmail.com",
      status: "Aktivan",
    },
    {
      id: 11,
      email: "admirrr@gmail.com",
      status: "Neaktivan",
    },
    {
      id: 12,
      email: "dijana@gmail.com",
      status: "Aktivan",
    },
    {
      id: 13,
      email: "admir@gmail.com",
      status: "Aktivan",
    },
    {
      id: 14,
      email: "adm@gmail.com",
      status: "Aktivan",
    },
    {
      id: 15,
      email: "admirrr@gmail.com",
      status: "Neaktivan",
    },
    {
      id: 16,
      email: "dijana@gmail.com",
      status: "Aktivan",
    },
    {
      id: 17,
      email: "admir@gmail.com",
      status: "Aktivan",
    },
    {
      id: 18,
      email: "adm@gmail.com",
      status: "Aktivan",
    },
    {
      id: 19,
      email: "admirrr@gmail.com",
      status: "Neaktivan",
    },
    {
      id: 20,
      email: "dijana@gmail.com",
      status: "Aktivan",
    },
  ];

  const Rows = () => {
    var rows = users.map((user) => (
      <View key={user.id} style={styles.users.mainList}>
        <View style={styles.users.mainList.userContainer}>
          <Text style={styles.users.mainList.userContainer.email}>
            {user.email}
          </Text>
          <Text style={styles.users.mainList.userContainer.status}>
            {user.status}
          </Text>
        </View>
      </View>
    ));
    return (
      <View>
        <View style={styles.users.header}>
          <Text style={styles.users.header.emailCol}>Email</Text>
          <Text style={styles.users.header.statusCol}>Status</Text>
        </View>

        {rows}
      </View>
    );
  };

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
        <Rows />

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
