import {Text, View, StyleSheet, FlatList} from 'react-native'
import { useState, useEffect } from 'react';
import Cards from '../Components/Card';
import { db } from "../controller";
import { collection, getDocs } from "firebase/firestore";

//! falta filtrar hqs
export default function HQs(){ 
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const querySnapshot = await getDocs(collection(db, 'produtos'));
                const array = [];
                querySnapshot.forEach((doc) => {
                    array.push({id: doc.id, ...doc.data() });
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
                <Cards titulo={item.titulo} autor={item.autor} preco={item.preco} img={item.imagem} sinopse={item.sinopse} editora={item.editora}/> 
            )} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-around' }} ListHeaderComponent={() => (
            <View>
                <Text style={styles.titulo}> Livraria Nome </Text>
                <Text style={styles.subtitle}>Histórias em Quadrinhos</Text>
            </View>
            )}/>
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
        textShadowOffset: {width: 3, height: 3},
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(139, 124, 182)',
    }
});
