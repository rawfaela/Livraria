import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFav } from '../Components/FavsProvider';

export default function ShowInfo({ route }) {
    const { titulo, autor, imagem, sinopse, editora } = route.params;
    const { addToFav } = useFav();

    return(
        <ScrollView style={styles.container} nestedScrollEnabled={true} contentContainerStyle={{alignItems: 'center', flexGrow: 1}} showsVerticalScrollIndicator={false}>

            <View style={styles.cabecalho}>
                <Image source={{ uri: imagem }} style={styles.img} />
                <View style={styles.info}>
                    <Text style={styles.titulo}>{titulo} </Text>
                    <Text style={styles.autor}>{autor} </Text>
                    <Text style={styles.editora}>Editora: <Text style={{fontStyle: 'italic' }}>{editora}</Text></Text> 
                    <TouchableOpacity style={styles.add} onPress={() => addToFav({ titulo, autor, imagem, sinopse, editora })}><Text style={{textAlign: 'center', fontSize: 22}}>Favoritar {'<3'}</Text></TouchableOpacity>
                </View>
            </View>
                <Text style={styles.sinopse}><Text style={{fontWeight: 'bold'}}>Sinopse:</Text> {sinopse}</Text>
                

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
    editora:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '400',
    },
    info: {
        flex: 1,
        justifyContent: 'center',

    },
    sinopse: {
        textAlign: 'justify',
        fontSize: 19,
        fontWeight: '600', //gordura do texto
        marginTop: 20, // espaço pra cima e baixo
        marginBottom: 10,
        padding: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 12, 
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