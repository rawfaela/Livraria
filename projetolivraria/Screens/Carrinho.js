import {Text, View, StyleSheet, FlatList} from 'react-native'
import { useState } from 'react';
import Cards from '../Components/Card';

export default function Carrinho(){ 


    return(
        <View style={styles.container}>
            <Text style={styles.titulo}> Livraria Nome </Text>
            <Text style={styles.subtitle}>Carrinho</Text>
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
        color: 'rgb(46, 6, 83)',
    }
});
