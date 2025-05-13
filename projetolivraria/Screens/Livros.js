import {Text, View, StyleSheet, FlatList} from 'react-native'
import { useState } from 'react';
import Cards from '../Components/Card';

export default function Livros(){ 
    const [produtos, setProdutos] = useState([
        {id:1, titulo: 'Egeo Pina Blast', autor: 'autor', preco: '99,99', img: 'https://supercolecao.com/sites/default/files/styles/large/public/images/collections/package/embalagem-egeo-pina-blast-25007.jpg?itok=TeO4G4N5', sinopse: 'sinopse'},
        {id:2, titulo: "Dior J'Adore", autor: 'autor', preco: '1.039,99', img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS52_ktZmMEgRkqN9w9aRcamjjJcJSFm_toUeYkuuG4u0NjJqdUFe3fE_vg8Uw4KwrZA9hdIeUc38G--hABtZag38PqF_zJU6BHDqArQsl5qE173VZKX4UN', sinopse: 'sinopse'},
        {id:3, titulo: 'Chanel Coco', autor: 'autor', preco: '499,99', img: 'https://www.bearshop.com.br/wp-content/uploads/2017/10/bearshop-chanel-coco-mademoiselle-EDP-feminino.jpg', sinopse: 'sinopse'},
        {id:4, titulo: 'Jean Paul Gaultier Le Male', autor: 'autor', preco: '1.049,99', img: 'https://fragrance.vteximg.com.br/arquivos/ids/158429-1000-1000/jpg-le-male-le-parfum-125ml-1.png?v=638072329478900000', sinopse: 'sinopse'}
    ])

    return(
        <View style={styles.container}>            
            <FlatList data={produtos} renderItem={({item}) => (    
                <Cards titulo={item.titulo} autor={item.autor} preco={item.preco} img={item.img} sinopse={item.sinopse}/> 
            )} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-around' }} ListHeaderComponent={() => (
            <View>
                <Text style={styles.titulo}> Livraria Nome </Text>
                <Text style={styles.subtitle}>Livros</Text>
            </View>)}/>
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
    subtitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(136, 65, 202)',
    }
});
