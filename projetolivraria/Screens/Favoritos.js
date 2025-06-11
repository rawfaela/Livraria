import {Text, View, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import { useFav } from '../Components/FavsProvider';
import { useState, useEffect } from 'react';
import { db, auth } from "../controller";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Favoritos(){ 
    const { favorito, removeFromFav } = useFav();
    const [resenhas, setResenhas] = useState({});
    const [mostrarResenha, setMostrarResenha] = useState({});
    const [modoEdicao, setModoEdicao] = useState({});

    useEffect(() => {
        const carregarResenhasSalvas = async () => {
          const user = auth.currentUser;
          if (!user) return;
      
          try {
            const docRef = doc(db, "resenhas", user.uid);
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
              const data = docSnap.data();
              const resenhasPorId = {};
              (data.livros || []).forEach(item => {
                resenhasPorId[item.livroId] = item.resenha;
              });
              setResenhas(resenhasPorId);
            }
          } catch (error) {
            console.log("Erro ao carregar resenhas:", error);
          }
        };
      
        carregarResenhasSalvas();
    }, []);

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
        const resenhaTexto = resenhas[item.id]?.replace(/^\[EDITANDO\]/, "");
        
        if (!resenhaTexto || resenhaTexto.trim() === '') {
            Alert.alert('Erro', 'Por favor, escreva uma resenha antes de salvar.');
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Erro", "Você precisa estar logado para salvar uma resenha.");
            return;
        }

        try {
            const docRef = doc(db, "resenhas", user.uid);
            const docSnap = await getDoc(docRef);

            let resenhasDoUsuario = [];

            if (docSnap.exists()) {
                const data = docSnap.data();
                resenhasDoUsuario = Array.isArray(data.livros) ? data.livros : [];
            }

            const novaResenha = {
                livroId: item.id,
                titulo: item.titulo,
                autor: item.autor,
                imagem: item.imagem,
                resenha: resenhaTexto,
                dataResenha: new Date()
            };

            const index = resenhasDoUsuario.findIndex(r => r.livroId === item.id);
            if (index !== -1) {
                resenhasDoUsuario[index] = novaResenha;
            } else {
                resenhasDoUsuario.push(novaResenha);
            }

            await setDoc(docRef, { livros: resenhasDoUsuario });

            Alert.alert('Sucesso', 'Resenha salva com sucesso!');
            setMostrarResenha(prev => ({
                ...prev,
                [item.id]: false
            }));
            setModoEdicao(prev => ({
                ...prev,
                [item.id]: false
            }));
            setResenhas(prev => ({
                ...prev,
                [item.id]: resenhaTexto
            }));
        } catch (error) {
            console.error("Erro ao salvar resenha:", error);
            Alert.alert("Erro", "Erro ao salvar resenha.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Livraria JRI </Text>
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

                                    {resenhas[item.id] ? (
                                        <>
                                            <TouchableOpacity 
                                                style={styles.botaoResenha}
                                                onPress={() => {
                                                    toggleResenha(item.id);
                                                    setModoEdicao(prev => ({...prev, [item.id]: false}));
                                                }}
                                            >
                                                <Text style={styles.textoBotao}>Mostrar resenha</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                style={styles.botaoResenha}
                                                onPress={() => {
                                                    toggleResenha(item.id);
                                                    setModoEdicao(prev => ({...prev, [item.id]: true}));
                                                    const resenhaAtual = resenhas[item.id] || '';
                                                    const semTagEditando = resenhaAtual.replace(/^\[EDITANDO\]/, '');
                                                    updateResenha(item.id, "[EDITANDO]" + semTagEditando);
                                                }}
                                            >
                                                <Text style={styles.textoBotao}>Editar resenha</Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <TouchableOpacity 
                                            style={styles.botaoResenha}
                                            onPress={() => {
                                                toggleResenha(item.id);
                                                setModoEdicao(prev => ({...prev, [item.id]: true}));
                                            }}
                                        >
                                            <Text style={styles.textoBotao}>Adicionar resenha</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <View style={styles.botoes}>
                                    <TouchableOpacity onPress={() => removeFromFav(item.id)}>
                                        <Image style={styles.img} source={require('../assets/removefav.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {mostrarResenha[item.id] && (
                                <View style={styles.resenhaContainer}>
                                    {modoEdicao[item.id] ? (
                                        <>
                                            <TextInput 
                                                style={styles.input} 
                                                placeholder="Escreva sua resenha aqui..." 
                                                value={resenhas[item.id]?.replace("[EDITANDO]", "") || ''}
                                                onChangeText={(texto) => updateResenha(item.id, "[EDITANDO]" + texto)}
                                                multiline={true}
                                                numberOfLines={4}
                                            />
                                            <TouchableOpacity
                                                style={[styles.botaoSalvar, { marginTop: 10 }]}
                                                onPress={() => salvarResenha(item)}
                                            >
                                                <Text style={styles.textoBotao}>Salvar</Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <Text style={{ fontSize: 16 }}>{resenhas[item.id]}</Text>
                                    )}
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
        color: 'rgb(173, 148, 238)',
        textShadowColor: 'rgb(97, 87, 128)',
        textShadowOffset: {width: 3, height: 3},
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(97, 87, 128)',
    },
    vazio: {
        fontSize: 25,
        fontWeight:"bold",
        fontFamily: 'Nunito',
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
        height: 150,
        width: 150,
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
        padding: 3,
        borderRadius: 5,
        alignContent: 'center',
        right: 30,
        top: 10,
        marginBottom: 5
    },
    botaoSalvar: {
        backgroundColor: 'rgb(193, 175, 243)',
        padding: 3,
        borderRadius: 5,
        alignContent: 'center',
        top: 10,
        marginBottom: 5
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
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
