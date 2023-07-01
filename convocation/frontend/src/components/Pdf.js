// Pdf.js
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import watermarkImage from "./watermark.png"; // Import your watermark image

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  text: {
    fontSize: 12, // Default font size
    textAlign: "justify"
  },
  section: {
    marginTop: 70,
    marginLeft: 30,
    marginRight:30,
    padding: 20,
    flexGrow: 1,
  },
  watermarkContainer: {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
  },
  watermarkImage: {
    width: "200px",
    height: "auto",
  },
});

export default function Pdf({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={[styles.text, { fontSize: 14,fontWeight:'bold' }]}>
            Chittagong University of Engineering and Technology
          </Text>
          <Text style={[styles.text, { fontSize: 14 }]}>
            Chittagong-4349, Bangladesh{" "}{'\n'}{'\n'}{'\n'}
          </Text>
          <Text style={[styles.text, { fontSize: 14 }]}>
            Subject: Invitation to University Convocation and Reunion Event{'\n'}{'\n'}{'\n'}{'\n'}
          </Text>
          <Text style={[styles.text, { fontSize: 12 }]}>Dear {data},</Text>
          <Text style={[styles.text, { fontSize: 12 }]}>
            We are delighted to extend our warmest congratulations to you on
            your outstanding academic achievements and successful completion of
            your studies at CUET. As a testament to your hard work,
            dedication, and academic excellence, we are pleased to invite you to
            our annual Convocation and Reunion Event{'\n'}{'\n'}{'\n'}
          </Text>
          <Text style={[styles.text, { fontSize: 12 }]}>
            Date: [Convocation and Reunion Date] {'\n'}{'\n'} Time: [Convocation and Reunion
            Time]{'\n'}{'\n'} Venue: [Convocation and Reunion Venue]{'\n'}{'\n'}
          </Text>
        </View>
        <View style={styles.watermarkContainer}>
          <Image src={watermarkImage} style={styles.watermarkImage} />
        </View>
      </Page>
    </Document>
  );
}
