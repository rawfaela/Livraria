import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FavoriteButton } from "../Components/FavsProvider";

export default function Cards({id, titulo, autor, imagem, sinopse, editora}){
    const navigation = useNavigation();
    
    const bookData = {
        id,
        titulo,
        autor,
        imagem,
        sinopse,
        editora
    };

    return (
        <View style={styles.background}>

            <TouchableOpacity onPress={()=>navigation.navigate('ShowInfo',{id, titulo, autor, imagem, sinopse, editora})} style={styles.touchContainer}>  
                <Image source={{uri: imagem}}style={styles.img}/>
                <View style={{flex: 1, marginLeft:5}}>
                    <Text style={styles.titulo}>{titulo} </Text>
                    <Text style={styles.autor}>{autor} </Text>
                </View>
            </TouchableOpacity> 
            
            <FavoriteButton 
                bookData={bookData}
                style={styles.fav}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        backgroundColor: 'rgb(193, 175, 243)',
        width: '45%',
        height: '93%',
        padding: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 20,
        justifyContent: 'space-around',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
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
    txt: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600',
    },
    img: {
        width: 150,
        height: 210,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'black',
    },
    fav: {
        marginTop: 20,
        paddingInline: 6,
    },
})