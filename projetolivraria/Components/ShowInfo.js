import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFav } from '../Components/FavsProvider';

//! SCROLL NAO FUNCIONA (no celular pega ?)
export default function ShowInfo({route}){
    const { titulo, autor, imagem, sinopse, editora } = route.params;
    const { addToFav } = useFav();

    return(
        <ScrollView style={styles.container} nestedScrollEnabled={true} contentContainerStyle={{alignItems: 'center', flexGrow: 1}}>
            <View style={styles.cabecalho}>
                <Image source={{uri: imagem}} style={styles.img}/>
                <View style={styles.info}>
                    <Text style={styles.titulo}>{titulo} </Text>
                    <Text style={styles.autor}>{autor} </Text>
                    <Text style={styles.txt}>Editora: {editora}</Text> 
                    <TouchableOpacity style={styles.add} onPress={() => addToFav({ titulo, autor, imagem, sinopse, editora })}><Text style={{textAlign: 'center', fontSize: 22}}>Favoritar {'<3'}</Text></TouchableOpacity>
                </View>
            </View>
                <Text style={styles.sinopse}>Sinopse: {sinopse}</Text>
                
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(208, 157, 231)",
        padding: 15,
        
    },
    cabecalho: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignSelf: 'stretch',   
        gap: 5, 
    },
    titulo: {
        textAlign: 'center',
        fontSize: 27,
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
    info: {
        flex: 1,
        justifyContent: 'center'    
    },
    sinopse:{
        textAlign: 'justify',
        fontSize: 23,
        fontWeight: '600',
    },
    img: {
        width: 150,
        height: 230,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'rgb(46, 6, 83)',
    },    
    add: {
        backgroundColor: 'rgb(194, 100, 238)',
        padding: 2,
        borderRadius: 5,
    }
})