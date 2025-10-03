import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Animated,
} from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

//REcebe 'route' para pegar os parametros e 'navigation' para customizar o header
export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animação de entrada
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  //useEffect para buscar os dados do produto
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar produto.'))
      .finally(() => setIsLoading(false));
  }, [productId]);

  //Renderizaçao condicional para loading e erro
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return <View style={styles.centered}><Text>Produto não encontrado.</Text></View>;
  }

  //Renderizacao principal com os detalhes do produto
  return (
    <ScrollView style={styles.background}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>
          R$ {Number(product.price).toFixed(2).replace('.', ',')}
        </Text>
        <Text style={styles.descriptionLabel}>Descrição:</Text>
        <Text style={styles.description}>{product.description}</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f3f6fb',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f6fb',
  },
  card: {
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 28,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#007bff',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: width > 400 ? 220 : 160,
    height: width > 400 ? 220 : 160,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  category: {
    fontSize: 15,
    color: '#6c757d',
    marginBottom: 8,
    textTransform: 'capitalize',
    fontFamily: 'Poppins, Roboto, Arial',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
    fontFamily: 'Poppins, Roboto, Arial',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 16,
    fontFamily: 'Poppins, Roboto, Arial',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
    fontFamily: 'Poppins, Roboto, Arial',
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#343a40',
    fontFamily: 'Poppins, Roboto, Arial',
    textAlign: 'justify',
  },
});
