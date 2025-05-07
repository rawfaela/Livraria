import { View, Text, StyleSheet, Image } from "react-native";

export default function Cards({nome, preco, img}){
    return(
        <View style={styles.prod}>       
            <Image source={{uri: img}}style={styles.imgprods}/>
            <View style={{flex: 1, marginLeft:5 }}>
                <Text style={styles.txtprod}>{nome} </Text>
                <Text style={styles.txtprod}>R${preco}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    prod:{
        alignItems: 'center',
        backgroundColor: 'rgb(208, 157, 231)',
        width: '90%',
        padding: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 20,
        flexDirection: 'row',
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