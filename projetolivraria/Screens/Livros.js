import {Text, View, StyleSheet, FlatList} from 'react-native'
import { useState, useEffect } from 'react';
import Cards from '../Components/Card';
import { db } from "../controller";
import { collection, getDocs } from "firebase/firestore";
import { useFav } from '../Components/FavsProvider';

export default function Livros(){ 
    const [produtos, setProdutos] = useState([])
    const { addToFav } = useFav();

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const querySnapshot = await getDocs(collection(db, 'produtos'));
                const array = [];
                querySnapshot.forEach((doc) => {
                    const produto = { id: doc.id, ...doc.data() };
          
                    if (produto.categoria === 'Livro') {
                        array.push(produto);
                    }
        });
                setProdutos(array);
            } catch (error){
                console.log("Erro ao buscar produtos: ", error)
            }
        }
        carregarProdutos();
    }, []);


    return(
        <View style={styles.container}>            
            <FlatList data={produtos} renderItem={({item}) => (    
                <Cards id={item.id} titulo={item.titulo} autor={item.autor} preco={item.preco} imagem={item.imagem} sinopse={item.sinopse} editora={item.editora} favoritar={() => {addToFav(item)}}/> 
            )} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-around' }} ListHeaderComponent={() => (
            <View>
                <Text style={styles.titulo}> Livraria JRI </Text>
                <Text style={styles.subtitle}>Livros</Text>
            </View>)}/>
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
    }
});
