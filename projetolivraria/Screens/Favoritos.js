import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { useFav } from '../Components/FavsProvider';
import '@fontsource/playfair-display';

export default function Favoritos() {
    const { favorito } = useFav();

    return (
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

                            <Image style={styles.imagem} source={{ uri: item.imagem }} resizeMode="contain" />
                            <View style={styles.textos}>
                                <Text style={styles.texto1}>{item.titulo}</Text>
                                <Text style={styles.texto2}>{item.autor}</Text>
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
        backgroundColor: 'rgb(208, 222, 252)',
    },
    titulo: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Playfair Display',
        color: 'rgb(193, 175, 243)',
        textShadowColor: 'rgb(139, 124, 182)',
        textShadowOffset: { width: 3, height: 5 },
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(139, 124, 182)',
    },
    vazio: {
        fontSize: 25,
        fontWeight:"bold",
        fontFamily: 'Nunito',
        textAlign: 'center',
        marginTop: 20,
        color: 'rgb(115, 105, 143)',
    },

    imagem: {
        height: 200,
        width: 200,
        right: 30,
    },


    texto1: {
        fontSize: 25,
        color: "black",
        fontWeight: 'bold',
        flexShrink: 1,
        marginBottom: 5,
        right: 30
    },

    texto2: {
        fontSize: 23,
        color: "black",
        flexShrink: 1,
        marginBottom: 5,
        right: 30
    },


    valor: {
        fontFamily: 'Arial Narrow',
        fontSize: 40,
        color: "#555",
    },

    card: {
        flexDirection: "row",
        padding: 15,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 7,
        alignItems: "center",
    },

    textos: {
        flex: 1,
        flexDirection: 'column',
        textAlign: "center",
        justifyContent: 'center',
    },
});
