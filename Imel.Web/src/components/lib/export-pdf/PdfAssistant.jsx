import { useState, useEffect } from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { application } from "../../../application";
import { PdfUsers } from "../export-pdf/PdfUsers";
import { PdfHeader } from "../export-pdf/PdfHeader";

let styles = StyleSheet.create({
  body: {
    paddingTop: "35",
    paddingBottom: "105",
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
  let [users, setUsers] = useState([]);

  useEffect(() => {
    let fetchUsers = async () => {
      let token = sessionStorage.getItem("token");
      let request = await fetch(`${application.url}/export/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await request.json().then((data) => {
        setUsers(data.response);
      });
    };

    fetchUsers();
  }, []);

  return (
    <Document>
      <Page style={styles.body}>
        <PdfHeader />
        <PdfUsers users={users} />

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
