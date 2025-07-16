import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQ = () => {
  const navigation = useNavigation();

  const questions = [
    {
      question: "Bagaimana cara menghubungi team BV dalam aplikasi ini?",
      answer:
        "Anda dapat membuka menu “Booking” dan membuka salah satu “card” tamu bersangkutan. “Message” terletak dalam card tersebut",
    },
    {
      question: "Bagaimana cara menemukan newsletter spesifik yang ingin dibaca?",
      answer: "Newsletter dapat ditemukan pada menu ‘Newsletter’ yang terletak di halaman utama.",
    },
    {
      question: "Dimana saya bisa memantau progress revenue target?",
      answer: "Progress revenue target dapat dilihat pada menu ‘Revenue Progress’ di halaman utama.",
    },
    {
      question: "Bagaimana cara memperbaharui profile saya?",
      answer: "Anda bisa memperbaharui profile melalui menu ‘Edit Personal Information’ yang ada di halaman Menu.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {questions.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </ScrollView>
  );
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[styles.faqBox, { marginBottom: 20 }]}>
      <TouchableOpacity onPress={toggleOpen} style={styles.faqHeader}>
        <Text style={[styles.faqQuestion, isOpen && styles.faqQuestionOpen]}>{question}</Text>
        
        <View style={styles.arrowContainer}>
        <Image
          source={require("../../assets/icons/openarrowgray.png")}
          style={StyleSheet.flatten([
          styles.arrowIcon,
          { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }
  ])}
/>
        </View>
        
      </TouchableOpacity>
      {isOpen && (
        <Animated.View
          style={[
            styles.faqAnswer,
            {
              opacity: animation,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 10],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.faqAnswerText}>{answer}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  returnText: {
    color: "#5B5E6B",
    fontSize: 14,
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1076BC",
    marginBottom: 20,
  },
  faqBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  arrowContainer: {
    width: 10,
    alignItems: 'flex-end',
  },
  arrowIcon: {
    width: 10,
    height: 10,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontSize: 12,
    color: "#5B5E6B",
    fontWeight: "normal",
  },
  faqQuestionOpen: {
    fontWeight: "bold",
  },
  faqAnswer: {
    marginTop: 10,
  },
  faqAnswerText: {
    fontSize: 12,
    color: "#5B5E6B",
  },
});

export default FAQ;