import {Text, View, StyleSheet, FlatList} from 'react-native'
import { useState, useEffect } from 'react';
import Cards from '../Components/Card';
import { db } from "../controller";
import { collection, getDocs } from "firebase/firestore";

export default function Home(){ 
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
                <Cards titulo={item.titulo} autor={item.autor} preco={item.preco} img={item.imagem} sinopse={item.sinopse}/> 
            )} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-around' }} ListHeaderComponent={() => (<Text style={styles.titulo}> Livraria Nome </Text>)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titulo: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(46, 6, 83)',
        textShadowColor: 'rgba(136, 65, 202, 0.49)',
        textShadowOffset: {width: 2, height: 2},
    },
});
