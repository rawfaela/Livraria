import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";

export default function Cards({titulo, autor, preco, img}){
/*     const showInfo = () => {
        console.log("Alerta foi acionado!");
        Alert.alert(
            titulo,
            `Autor: ${autor}\nPreço: R$${preco}`,
            [{ text: "Fechar", style: "cancel" }]
        );
    }; */ //! NAO FUNCIONA

    return(
        <View style={styles.prod}>
            <TouchableOpacity /* onPress={showInfo} */>  
                <Image source={{uri: img}}style={styles.imgprods}/>
                <View style={{flex: 1, marginLeft:5 }}>
                    <Text style={styles.txtprod}>{titulo} </Text>
                    <Text style={styles.txtprod}>{autor} </Text>
                    <Text style={styles.txtprod}>R${preco}</Text>
                </View>
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    prod:{
        alignItems: 'center',
        backgroundColor: 'rgb(208, 157, 231)',
        width: '45%',
        height: '90%',
        padding: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 20,
        justifyContent: 'space-around'
    },
    txtprod:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600',
    },
    imgprods: {
        width: 150,
        height: 150,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'rgb(46, 6, 83)',
    },

})