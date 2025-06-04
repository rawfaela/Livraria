import {Text, View, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import { useFav } from '../Components/FavsProvider';
import { useState } from 'react';
import { db } from "../controller";
import { collection, addDoc } from 'firebase/firestore';

export default function Favoritos(){ 
    const { favorito, removeFromFav } = useFav();
    const [resenhas, setResenhas] = useState({});
    const [mostrarResenha, setMostrarResenha] = useState({});

    const toggleResenha = (itemId) => {
        setMostrarResenha(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const updateResenha = (itemId, texto) => {
        setResenhas(prev => ({
            ...prev,
            [itemId]: texto
        }));
    };

    const salvarResenha = async (item) => {
        const resenhaTexto = resenhas[item.id];
        
        if (!resenhaTexto || resenhaTexto.trim() === '') {
            Alert.alert('Erro', 'Por favor, escreva uma resenha antes de salvar.');
            return;
        }

        try {
            await addDoc(collection(db, "resenhas"), {
                livroId: item.id,
                titulo: item.titulo,
                autor: item.autor,
                imagem: item.imagem,
                resenha: resenhaTexto,
                dataResenha: new Date(),
            }); 
            
            Alert.alert('Sucesso', 'Resenha salva com sucesso!');
            
            // Ocultar o campo de resenha após salvar
            setMostrarResenha(prev => ({
                ...prev,
                [item.id]: false
            }));
            
        } catch (error) {
            console.error("Erro ao adicionar resenha: ", error);
            Alert.alert("Erro", "Erro ao adicionar resenha.");
        } 
    };

    const handleBotaoClick = (item) => {
        if (mostrarResenha[item.id]) {
            // Se está mostrando, é para salvar
            salvarResenha(item);
        } else {
            // Se não está mostrando, é para mostrar
            toggleResenha(item.id);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Livraria Nome </Text>
            <Text style={styles.subtitle}>Favoritos</Text>

            {favorito.length === 0 ? (
                <Text style={styles.vazio}>Você não favoritou nenhum livro ainda...</Text>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={favorito}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <Image style={styles.imagem} source={{ uri: item.imagem }} resizeMode="contain" />
                                <View style={styles.textos}>
                                    <Text style={styles.texto1}>{item.titulo}</Text>
                                    <Text style={styles.texto2}>{item.autor}</Text>
                                </View>

                                <View style={styles.botoes}>
                                    <TouchableOpacity 
                                        style={styles.botaoResenha}
                                        onPress={() => handleBotaoClick(item)}
                                    >
                                        <Text style={styles.textoBotao}>
                                            {mostrarResenha[item.id] ? 'Salvar resenha' : 'Adicionar resenha'}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => removeFromFav(item.id)}>
                                        <Image style={styles.img} source={require('../assets/removefav.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {mostrarResenha[item.id] && (
                                <View style={styles.resenhaContainer}>
                                    <TextInput 
                                        style={styles.input} 
                                        placeholder="Escreva sua resenha aqui..." 
                                        value={resenhas[item.id] || ''}
                                        onChangeText={(texto) => updateResenha(item.id, texto)}
                                        multiline={true}
                                        numberOfLines={4}
                                    />
                                </View>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(208, 222, 252)',
    },
    titulo: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(193, 175, 243)',
        textShadowColor: 'rgb(139, 124, 182)',
        textShadowOffset: { width: 3, height: 3 },
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(139, 124, 182)',
    },
    vazio: {
        fontSize: 24,
        fontFamily: 'Arial Narrow',
        textAlign: 'center',
        marginTop: 20,
        color: 'rgb(115, 105, 143)',
    },
    card: {
        padding: 15,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    imagem: {
        height: 200,
        width: 200,
        right: 30,
    },
    texto1: {
        fontSize: 25,
        color: "black",
        fontWeight: 'bold',
        flexShrink: 1,
        marginBottom: 5,
        right: 30
    },
    texto2: {
        fontSize: 23,
        color: "black",
        flexShrink: 1,
        marginBottom: 5,
        right: 30
    },
    textos: {
        flex: 1,
        flexDirection: 'column',
        textAlign: "center",
        justifyContent: 'center',
    },
    botoes: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
    },
    botaoResenha: {
        backgroundColor: 'rgb(193, 175, 243)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    resenhaContainer: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'top',
        minHeight: 100,
    },
    img: {
        width: 30,
        height: 30,
    }
});