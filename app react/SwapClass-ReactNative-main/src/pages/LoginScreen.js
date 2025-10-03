import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Animação de entrada do card
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

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

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha todos os campos de usuário e senha.');
      return;
    }
    setIsLoading(true);
    try {
      const userResponse = await axios.get('https://fakestoreapi.com/users');
      const users = await userResponse.data;
      const userExists = users.find(user => user.username === username);
      if (!userExists) {
        throw new Error('Usuário não encontrado.');
      }
      await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      });
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.replace('Home');
    } catch (error) {
      let errorMessage = 'Ocorreu um erro. Tente novamente.';
      if (error.response && error.response.data) {
        errorMessage = error.response.data;
      } else if (error.request) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua internet.';
      } else {
        errorMessage = error.message;
      }
      Alert.alert('Erro no Login', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ícones de fundo */}
      <View style={styles.backgroundIcons}>
        <MaterialIcons name="watch" size={22} color="#007bff44" style={[styles.icon, { top: 30, left: 20 }]} />
        <FontAwesome5 name="tshirt" size={20} color="#28a74544" style={[styles.icon, { top: 80, right: 30 }]} />
        <FontAwesome5 name="ring" size={18} color="#ffc10755" style={[styles.icon, { bottom: 90, left: 60 }]} />
        <Entypo name="shopping-bag" size={22} color="#ff6f6144" style={[styles.icon, { bottom: 40, right: 40 }]} />
        <MaterialIcons name="laptop" size={18} color="#6f42c144" style={[styles.icon, { top: height / 2, left: 10 }]} />
        <FontAwesome5 name="gem" size={18} color="#00bcd444" style={[styles.icon, { top: 80, right: 100 }]} />
        <FontAwesome5 name="shoe-prints" size={18} color="#79554844" style={[styles.icon, { bottom: 160, right: 80 }]} />
        <MaterialIcons name="headphones" size={18} color="#9c27b044" style={[styles.icon, { top: 200, left: 100 }]} />
        <FontAwesome5 name="hat-cowboy" size={18} color="#ff980044" style={[styles.icon, { bottom: 200, left: 30 }]} />
        <Entypo name="mobile" size={18} color="#607d8b44" style={[styles.icon, { top: 160, right: 60 }]} />
        {/* Novos ícones e posições */}
        <FontAwesome5 name="shopping-cart" size={20} color="#007bff33" style={[styles.icon, { top: 40, right: 80 }]} />
        <FontAwesome5 name="user" size={18} color="#28a74533" style={[styles.icon, { top: 140, left: 60 }]} />
        <FontAwesome5 name="wallet" size={18} color="#ffc10733" style={[styles.icon, { bottom: 60, right: 120 }]} />
        <FontAwesome5 name="glasses" size={18} color="#ff6f6133" style={[styles.icon, { top: 220, right: 20 }]} />
        <FontAwesome5 name="tshirt" size={18} color="#6f42c133" style={[styles.icon, { bottom: 120, left: 120 }]} />
        <FontAwesome5 name="ring" size={18} color="#00bcd433" style={[styles.icon, { top: 60, left: 160 }]} />
        <FontAwesome5 name="gem" size={18} color="#79554833" style={[styles.icon, { bottom: 80, right: 180 }]} />
        <FontAwesome5 name="shoe-prints" size={18} color="#9c27b033" style={[styles.icon, { top: 260, left: 200 }]} />
        <MaterialIcons name="watch" size={18} color="#ff980033" style={[styles.icon, { bottom: 220, right: 60 }]} />
        <Entypo name="shopping-bag" size={18} color="#607d8b33" style={[styles.icon, { top: 300, left: 40 }]} />
        {/* posições para preencher mais o fundo */}
        <FontAwesome5 name="tshirt" size={16} color="#28a74533" style={[styles.icon, { top: 350, right: 10 }]} />
        <FontAwesome5 name="ring" size={16} color="#ffc10733" style={[styles.icon, { bottom: 250, left: 90 }]} />
        <FontAwesome5 name="gem" size={16} color="#00bcd433" style={[styles.icon, { top: 400, right: 60 }]} />
        <FontAwesome5 name="shoe-prints" size={16} color="#79554833" style={[styles.icon, { bottom: 300, right: 30 }]} />
        <MaterialIcons name="headphones" size={16} color="#9c27b033" style={[styles.icon, { top: 420, left: 120 }]} />
        <FontAwesome5 name="hat-cowboy" size={16} color="#ff980033" style={[styles.icon, { bottom: 350, left: 60 }]} />
        <Entypo name="mobile" size={16} color="#607d8b33" style={[styles.icon, { top: 460, right: 120 }]} />
        {/*  */}
        <MaterialIcons name="watch" size={18} color="#007bff44" style={[styles.icon, { top: 60, left: width * 0.25 }]} />
        <FontAwesome5 name="tshirt" size={16} color="#28a74544" style={[styles.icon, { top: 180, left: width * 0.5 - 8 }]} />
        <FontAwesome5 name="ring" size={16} color="#ffc10755" style={[styles.icon, { top: 320, left: width * 0.75 }]} />
        <Entypo name="shopping-bag" size={18} color="#ff6f6144" style={[styles.icon, { bottom: 100, left: width * 0.33 }]} />
        <MaterialIcons name="laptop" size={16} color="#6f42c144" style={[styles.icon, { bottom: 200, left: width * 0.5 - 8 }]} />
        <FontAwesome5 name="gem" size={16} color="#00bcd444" style={[styles.icon, { bottom: 300, left: width * 0.66 }]} />
      </View>

      {/* Card centralizado */}
      <View style={styles.centerContainer}>
        {/* Card animado */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Faça seu Login para continuar</Text>

          {/* Input Usuário */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="person" size={22} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Input Senha */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={22} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#aaa"
            />
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 16 }} />
          ) : (
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundIcons: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  icon: {
    position: 'absolute',
    opacity: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width > 400 ? 370 : '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 22,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontFamily: 'Poppins, Roboto, Arial',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: 'Poppins, Roboto, Arial',
    fontSize: 16,
    color: '#555',
    marginBottom: 28,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginBottom: 18,
    paddingHorizontal: 10,
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#222',
    fontFamily: 'Poppins, Roboto, Arial',
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 2,
    // Animação de hover para web
    transitionProperty: 'background, transform',
    transitionDuration: '200ms',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Poppins, Roboto, Arial',
  },
});

// Adicione esta regra global no seu index.html ou use um pacote de fontes para garantir a fonte Poppins/Roboto no web.

