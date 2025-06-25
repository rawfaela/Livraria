import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useFav } from '../Components/FavsProvider';
import { useState, useEffect } from 'react';
import { db, auth } from "../controller";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Favoritos() {
    const { favorito, removeFromFav } = useFav(); //livros adicionados e remover dos fav
    const [resenhas, setResenhas] = useState({}); //resenha
    const [mostrarResenha, setMostrarResenha] = useState({}); //controle de mostra a resenha
    const [modoEdicao, setModoEdicao] = useState({}); //controle de modo ou visualização ou edião da resenha

    useEffect(() => { //useffect q roda uma vez
        const carregarResenhasSalvas = async () => { //funcao pra carrega as resenhas salvas, assincrona pra nao estraga o app inteiro
            const user = auth.currentUser; //pega o usuario logado
            if (!user) return;//se nao tive usuario nao retorna nada e continua o resto sem executa
            try { //cria uma referencia de busca nos documentos q seria no banco tal na colecao tal vai pega do id do user tal
                const docRef = doc(db, "resenhas", user.uid);
                const docSnap = await getDoc(docRef); //ai aq vai usar como 'parametro'

                if (docSnap.exists()) { //se exister o documento, no caso a resenha vai....
                    const data = docSnap.data(); //pega os dados q vai ser um array com livro e resenha
                    const resenhasPorId = {}; // um objeto q pega a resenha pelo id do livro
                    (data.livros || []).forEach(item => { //(data.livros || []) -> se os dados do livro q eh o array existir vai percorrer cada item do livros, pegando a resenha pelo id do livro, caso nao tenha, vai devolver um array vazio para nn ocorrer nenhum problema
                        resenhasPorId[item.livroId] = item.resenha;
                    });
                    setResenhas(resenhasPorId); //por ultimo vai atualizar nas resenhas, essa msm resenha q foi percorrida antes
                }
            } catch (error) { //caso de erro, vai aparece no console
                console.log("Erro ao carregar resenhas:", error);
            }
        };

        carregarResenhasSalvas(); //roda essa funcao uma vez ja q eh useffect
    }, []);

    const toggleResenha = (itemId) => { //prev eh o valor atual do mostrar resenha, ele vai modifcar o valor do mostrar resenha, com base no id do livro
        setMostrarResenha(prev => ({ 
            ...prev, //mantem as resenhas dos outros livros msm q mudado
            [itemId]: !prev[itemId] //resumo, muda o estado, ai aparece a resenha
        })); //entendi mais ou menos
    };

    const updateResenha = (itemId, texto) => {
        setResenhas(prev => ({
            ...prev,
            [itemId]: texto //isso aq atualiza o estado da resenha pelo texto q vai ser inserido
        }));
    };

    const salvarResenha = async (item) => {//funcao de salvar resenha q recebe como parametro o livro
        const resenhaTexto = resenhas[item.id]?.replace(/^\[EDITANDO\]/, ""); //cria objeto resenha, peha a resenha pelo id do livro, e tira o editando caso exista ne

        if (!resenhaTexto || resenhaTexto.trim() === '') {
            Alert.alert('Erro', 'Por favor, escreva uma resenha antes de salvar.');
            return; //se nao tive resenha ou tiver vazia, vai mostra a msg
        }

        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Erro", "Você precisa estar logado para salvar uma resenha.");
            return; //se nao tiver usuario aparece mensagem de erro,meio desnecessario mas nhe
        }

        try {
            const docRef = doc(db, "resenhas", user.uid); //aqui pega a referencia da resenha pelo id do funcionario 
            const docSnap = await getDoc(docRef); //executa aq em cima ea referencia

            let resenhasDoUsuario = []; //array para guardar todas as resenhas salvas do usuario

            if (docSnap.exists()) { //se ja existe o documento para salvar a resenha
                const data = docSnap.data(); //pega os dados do livro, alem da resenha
                resenhasDoUsuario = Array.isArray(data.livros) ? data.livros : [];//se data.livros for um array, vai ser guardado em resenhadousuario,  senao, vai fica vazio ainda
            }

            const novaResenha = {
                livroId: item.id,
                titulo: item.titulo,
                autor: item.autor,
                imagem: item.imagem,
                resenha: resenhaTexto,
                dataResenha: new Date() //cria a nova resenha com a data da resenha nova da resenha
            };

            const index = resenhasDoUsuario.findIndex(r => r.livroId === item.id); //cria um index q vai ser achado dentro do array resenha do usuario, se ja existe uma resenha com o id do item atual
            if (index !== -1) {//se nao encontrar o index, sera -1
                resenhasDoUsuario[index] = novaResenha;//atualiza a resenha existente 
            } else {
                resenhasDoUsuario.push(novaResenha);//adicionar resenha nova
            }

            await setDoc(docRef, { livros: resenhasDoUsuario });//salva td certinho no documento do banco

            Alert.alert('Sucesso', 'Resenha salva com sucesso!');
            setMostrarResenha(prev => ({
                ...prev,
                [item.id]: false
            }));
            setModoEdicao(prev => ({
                ...prev,
                [item.id]: false
            }));
            setResenhas(prev => ({ //atualizar o estado da resenha
                ...prev,
                [item.id]: resenhaTexto //atualiza todos os estados da resenha do modo de edicao que vai ser falso e o mostrar resenha, ja q foi salvo
            }));
        } catch (error) {
            console.error("Erro ao salvar resenha:", error);
            Alert.alert("Erro", "Erro ao salvar resenha.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Livraria JRI</Text>
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
                                                    setModoEdicao(prev => ({ ...prev, [item.id]: false }));
                                                }}
                                            >
                                                <Text style={styles.textoBotao}>Mostrar resenha</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.botaoResenha}
                                                onPress={() => {
                                                    toggleResenha(item.id);
                                                    setModoEdicao(prev => ({ ...prev, [item.id]: true }));
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
                                                setModoEdicao(prev => ({ ...prev, [item.id]: true }));
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
        textShadowOffset: { width: 3, height: 3 },
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(97, 87, 128)',
    },
    vazio: {
        fontSize: 25,
        fontWeight: "bold",
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
