import React from 'react'
import { Document, Page, Font, StyleSheet, View, Text } from '@react-pdf/renderer'
import albabaTTF from './alibaba.ttf'

Font.register({
  family: 'alibaba',
  src: albabaTTF
})

export interface PDFDocumentProps {
  data: {
    title: string
    content: string
  }[]
  netInfoData: {
    title: string
    content: string
  }[]
  name: string
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    fontFamily: 'alibaba',
    padding: 20,
    color: 'white'
  },
  section: {
    marginBottom: 10,
    fontFamily: 'alibaba',
    backgroundColor: '#25262f',
    padding: 10,
    borderRadius: 6
  },
  title: {
    fontSize: 24,
    paddingTop: 6,
    paddingBottom: 6,
    fontFamily: 'alibaba'
  },
  content: {
    fontSize: 14,
    color: '#cdcfd1'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: 'alibaba'
  }
})

const PDFDocument: React.FC<PDFDocumentProps> = ({ data, netInfoData, name }) => {
  const ele = data.map((item, index) => {
    return (
      <View style={styles.section} key={index}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    )
  })

  const netInfoEle = netInfoData.map((item, index) => {
    return (
      <View style={styles.row} key={index}>
        <Text style={styles.content}>
          {item.title}：{item.content}
        </Text>
      </View>
    )
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{name}</Text>
          {netInfoEle}
        </View>
        {ele}
      </Page>
    </Document>
  )
}

export default PDFDocument
