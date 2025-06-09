import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFav } from '../Components/FavsProvider';

//! SCROLL NAO FUNCIONA (no celular pega ?)
export default function ShowInfo({ route }) {
    const { titulo, autor, imagem, sinopse, editora } = route.params;
    const { addToFav } = useFav();
    //nestedScrollEnabled={true}
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}  contentContainerStyle={{ alignItems: 'center', flexGrow: 1, }}>
            <View style={styles.cabecalho}>
                <Image source={{ uri: imagem }} style={styles.img} />
                <View style={styles.info}>
                    <Text style={styles.titulo}>{titulo} </Text>
                    <Text style={styles.autor}>{autor} </Text>
                    <Text style={styles.txt}>Editora: {editora}</Text>
                    <TouchableOpacity style={styles.add} onPress={() => addToFav({ titulo, autor, imagem, sinopse, editora })}><Text style={{ textAlign: 'center', fontSize: 22 }}>Favoritar {'<3'}</Text></TouchableOpacity>
                </View>
            </View>
            <Text style={styles.sinopse}>Sinopse: {sinopse}</Text>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(193, 175, 243)',
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
    txt: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600',
    },
    info: {
        flex: 1,
        justifyContent: 'center',

    },
    sinopse: {
        textAlign: 'justify',
        fontSize: 19,
        fontWeight: '600', //gordura do texto
        lineHeight: 24, //tamanho das linhas: vertical
        letterSpacing: 0.3, //espaço entre as letras
        marginTop: 20, // espaço pra cima e baixo
        marginBottom: 10,
        paddingHorizontal: 16, //para o fundo, os tamanhos horizontais e verticais
        paddingVertical: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 12, 
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.09)',
        shadowColor: 'black',
        shadowOffset: {
            width: 0, //posições da sombra, tamanho e largura
            height: 3
        },
        shadowOpacity: 0.20, //opacidade da sombra e difusão
        shadowRadius: 6,
    },
    img: {
        width: 150,
        height: 230,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'black',
    },
    add: {
        backgroundColor: 'rgb(208, 222, 252)',
        padding: 2,
        borderRadius: 5,
    }
})