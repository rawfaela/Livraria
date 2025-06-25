import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFav } from "../Components/FavsProvider"; 

export default function Cards({id, titulo, autor, imagem, sinopse, editora}){ //parametros dos produtos-> props do livro
    const navigation = useNavigation(); //função para ir para outra tela caso clique em algm produto do card
    const { favorito, addToFav, removeFromFav } = useFav(); //1 lista de favoritos, 2 função q adiciona ao favorito, função q remove ao favorito
    const [isFavorited, setIsFavorited] = useState(false); //estado q guarda se o livro foi favoritado ou nao, se inicia com falso

    useEffect(() => { //esse use effect executa toda vez que... se a lista de favoritos muda ou o id de algm produto mudar
        const isInFavorites = favorito.some(item => item.id === id);
        setIsFavorited(isInFavorites);
    }, [favorito, id]); //verifica se o id de tal produto esta dentro da lista, se esta setIsFavorited(True)

    const handleFavoritar = () => { //aqui para adicionar ao favorito ou nao
        const bookData = {
            id,
            titulo,
            autor, //pega os data/dados do produto para adicionar na lista de favoritos
            imagem,
            sinopse,
            editora
        };

        if (isFavorited) { //se ja foi favoritado, remove com base no id do livro
            removeFromFav(id);
        } else {
            addToFav(bookData); //se nao, vai adicionar e levar com os dados do livro
        }
    };

    return ( //card com as imagens e os botoes de favoritar ou ja favoritado,  no is favorited? tem um if ternario se for favoritado==true, mostra favoritado, senao favoritar
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