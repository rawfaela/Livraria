import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFav } from "../Components/FavsProvider"; 

export default function Cards({id, titulo, autor, imagem, sinopse, editora}){
    const navigation = useNavigation();
    const { favorito, addToFav, removeFromFav } = useFav();
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const isInFavorites = favorito.some(item => item.id === id);
        setIsFavorited(isInFavorites);
    }, [favorito, id]);

    const handleFavoritar = () => {
        const bookData = {
            id,
            titulo,
            autor,
            imagem,
            sinopse,
            editora
        };

        if (isFavorited) {
            removeFromFav(id);
        } else {
            addToFav(bookData);
        }
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
            
            <TouchableOpacity 
                style={[styles.fav, isFavorited && styles.favoritado]} 
                onPress={handleFavoritar}
            >
                <Text style={{textAlign: 'center', fontSize: 20, color: isFavorited ? '#fff' : '#000'}}>
                    {isFavorited ? 'Favoritado ❤️' : 'Favoritar 🤍'}
                </Text>
            </TouchableOpacity>

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
        backgroundColor: 'rgb(208, 222, 252)',
        padding: 2,
        paddingInline: 6,
        borderRadius: 5,
    },
    favoritado: {
        backgroundColor: 'rgb(255, 107, 107)',
    }
})