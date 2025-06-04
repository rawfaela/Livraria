import {Text, View, StyleSheet, FlatList, Image} from 'react-native'
import { useFav } from '../Components/FavsProvider';

export default function Favoritos(){ 
    const { favorito } = useFav();

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Livraria Nome </Text>
            <Text style={styles.subtitle}>Favoritos</Text>

            {favorito.length === 0 ? (
                <Text style={styles.vazio}>Você não favoritou nenhum livro ainda...</Text>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={favorito}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image style={styles.imagem} source={{ uri: item.imagem }} />
                            <View style={styles.textos}>
                                <Text style={styles.texto}>{item.titulo}</Text>
                                <Text style={styles.texto}>{item.autor}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
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
    },
    vazio: {
        fontSize: 24,
        fontFamily: 'Arial Narrow',
        textAlign: 'center',
        marginTop: 20,
        color: '#555',
    },

    imagem: {
        height: 100,
        width: 100,
        borderRadius: 12,
        marginRight: 15,
    },

    texto: {
        fontFamily: 'Arial Narrow',
        fontSize: 30,
        color: "black",
        marginBottom: 5,
        flexWrap: 'wrap',
    },

    valor: {
        fontFamily: 'Arial Narrow',
        fontSize: 30,
        color: "#555",
    },

    card: {
        backgroundColor: "white",
        padding: 15,
        marginVertical: 8,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    textos: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
