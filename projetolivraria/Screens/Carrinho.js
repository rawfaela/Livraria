import {Text, View, StyleSheet, FlatList} from 'react-native'
import { useState } from 'react';
import Cards from '../Components/Card';

export default function Carrinho(){ 


    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Livraria Nome </Text>
            <Text style={styles.subtitle}>Carrinho</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(181, 194, 223)',
    },
    titulo: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(223, 243, 214)',
        textShadowColor: 'rgba(80, 102, 69, 0.75)',
        textShadowOffset: {width: 3, height: 3},
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(80, 102, 69)',
    }
});
