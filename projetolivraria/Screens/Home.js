import {Text, View, StyleSheet, FlatList} from 'react-native'
import { useState, useEffect } from 'react';
import Cards from '../Components/Card';
import { db } from "../controller";
import { collection, getDocs } from "firebase/firestore";
import { useFav } from '../Components/FavsProvider';

export default function Home(){ 
    const [produtos, setProdutos] = useState([])
    const { addToFav } = useFav();

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
                <Cards titulo={item.titulo} autor={item.autor} img={item.imagem} sinopse={item.sinopse} editora={item.editora} favoritar={() => {addToFav(item)}}/> 
            )} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-around' }} ListHeaderComponent={() => (<Text style={styles.titulo}> Livraria Nome </Text>)}/>
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
});
