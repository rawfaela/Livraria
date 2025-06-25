import { Text, View, StyleSheet, FlatList } from 'react-native'
import { useState, useEffect } from 'react';
import Cards from '../Components/Card';
import { db } from "../controller";
import { collection, getDocs } from "firebase/firestore";
import { useFav } from '../Components/FavsProvider';

export default function Home() {
    const [produtos, setProdutos] = useState([])
    const { addToFav } = useFav();

    useEffect(() => { //!useEffect eh quando um componente aparece na tela ao entrar e vc quer fazer uma função de algo, tipo, entrei e quero uma msg de acesso ao entrar, enqt aparece um componente de entrada
        async function carregarProdutos() { //usa uma funcao assíncrona para buscar dados do firebase, como demora um tempo para aparecer esses dados, utiliza esse tipo de função já que ela não trava o app , por exemplo, não aparecer nada por falta de dados
            try {
                const querySnapshot = await getDocs(collection(db, 'produtos')); //querySnapshot -> busca no banco "firebase me da todos os documentods da colecao produtos" ai ele devolve um pacote de produtos , o getDocs abre a gaveta com a coleçao de produtos
                const array = [];//cria um array vazio
                querySnapshot.forEach((doc) => { //querysnapshot eh uma lista com todos os produtos da coleção  PRODUTOS , por dentro de cada documento q seria, cada produto, pegando os id se 'empurra' dentro do array
                    array.push({ id: doc.id, ...doc.data() });  //dentro desse array alem de adicionar o id do produto, adiciona os dados -> data do documento/produto
                });
                setProdutos(array); //defini dentro do array
            } catch (error) { //caso for pego algum erro, vai aparece no console o erro e a msg de erro
                console.log("Erro ao buscar produtos: ", error)
            }
        }
        carregarProdutos(); //roda essa função ao carregar a tela 
    }, []); //-> o [] significa q so vai funciona uma vez qnd a tela for carregada

    return (
        <View style={styles.container}>
            <FlatList data={produtos} renderItem={({ item }) => ( //data ali serve para identificar o array q vai ser usado para mostrar a lista de produtos, cada item do array é de um lviro
                <Cards id={item.id} 
                titulo={item.titulo} 
                autor={item.autor} 
                imagem={item.imagem} 
                sinopse={item.sinopse} 
                editora={item.editora} 
                favoritar={() => { addToFav(item) }} 
            />
            )} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-around' }} ListHeaderComponent={() => (<Text style={styles.titulo}> Livraria JRI </Text>)} />
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
});
