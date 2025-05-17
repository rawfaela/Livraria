import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Cards({titulo, autor, preco, img, sinopse, editora}){
    const navigation = useNavigation();

    return(
        <View style={styles.background}>
            <TouchableOpacity onPress={()=>navigation.navigate('ShowInfo',{titulo, autor, preco, img, sinopse, editora})} style={styles.touchContainer}>  
                <Image source={{uri: img}}style={styles.img}/>
                <View style={{flex: 1, marginLeft:5}}>
                    <Text style={styles.titulo}>{titulo} </Text>
                    <Text style={styles.autor}>{autor} </Text>
                    <Text style={styles.txt}>R${parseFloat(preco).toFixed(2)}</Text>
                </View>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.add} /* onPress={} */><Text style={{textAlign: 'center', fontSize: 20}}>Adicionar ao carrinho</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        alignItems: 'center',
        backgroundColor: 'rgb(208, 157, 231)',
        width: '45%',
        height: '93%',
        padding: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 20,
        justifyContent: 'space-around',

    },
    touchContainer: {
        flex: 1,
        alignItems: 'center',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
    },
    autor: {
        textAlign: 'center',
        fontSize: 25,
        fontStyle: 'italic'
    },
    txt:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600',
    },
    img: {
        width: 150,
        height: 210,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'rgb(46, 6, 83)',
    },
    add: {
        marginTop: 20,
        backgroundColor: 'rgb(194, 100, 238)',
        padding: 2,
        borderRadius: 5,
    }

})