import { StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";

let styles = StyleSheet.create({
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
});

export const PdfHeader = () => {
  let todaysDate = moment().format("MMMM DD, YYYY");

  return (
    <View style={styles.header}>
      <Text style={styles.header.title}>Lista korisnika</Text>
      <Text style={styles.header.date}>
        Datum <Text style={styles.header.date.today}>{todaysDate}</Text>
      </Text>
      <Text style={styles.header.subtitle}>
        Ovdje možete pregledati sve korisnike koji koriste trenutno aplikaciju
        Imel d.o.o te njihovu aktivnost.
      </Text>
      <Text style={styles.note}>
        Dokument trenutno nije moguce uredivati te je namijenjen iskljucivo za
        pregledanje
      </Text>
    </View>
  );
};
