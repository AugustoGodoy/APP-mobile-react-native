import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function InfoScreen() {
  // Animação de entrada dos cards
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const membros = [
    { nome: 'Augusto de Oliveira Godoy', ra: '1136630' },
    { nome: 'Bento Martins', ra: '1125095' },
    { nome: 'Gabriel Portelinha Rico', ra: '1136215' },
    { nome: 'Ricardo Zanandrea', ra: '1136748' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Gradiente de fundo */}
      <View style={styles.backgroundGradient} />
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.Text
          style={[
            styles.headerTitle,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          Desenvolvedores do App
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          Aplicativo desenvolvido para a disciplina de React Native.
        </Animated.Text>

        {membros.map((m, i) => (
          <Animated.View
            key={m.ra}
            style={[
              styles.memberCard,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: Animated.add(slideAnim, new Animated.Value(i * 10)) },
                ],
              },
            ]}
          >
            <Text style={styles.memberName}>{m.nome}</Text>
            <Text style={styles.memberRA}>RA: {m.ra}</Text>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f6fb',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    backgroundColor: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
    // fallback para web:
    background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
  },
  container: {
    padding: 24,
    alignItems: 'center',
    minHeight: '100%',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#007bff',
    letterSpacing: 1,
    fontFamily: 'Poppins, Roboto, Arial',
    textShadowColor: '#b3e0ff',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    color: '#555',
    marginBottom: 32,
    lineHeight: 26,
    fontFamily: 'Poppins, Roboto, Arial',
  },
  memberCard: {
    width: width > 400 ? 350 : '95%',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#007bff',
    shadowOpacity: 0.13,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    borderWidth: 1,
    borderColor: '#e3eafc',
    // Efeito de destaque sutil
  },
  memberName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    fontFamily: 'Poppins, Roboto, Arial',
    letterSpacing: 0.5,
  },
  memberRA: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
    fontFamily: 'Poppins, Roboto, Arial',
  },
});

