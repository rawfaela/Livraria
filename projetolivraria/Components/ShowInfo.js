import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { FavoriteButton } from '../Components/FavsProvider';

export default function ShowInfo({ route }) {
    const { id, titulo, autor, imagem, sinopse, editora } = route.params;

    const bookData = {
        id,
        titulo,
        autor,
        imagem,
        sinopse,
        editora
    };

    return(
        <ScrollView style={styles.container} nestedScrollEnabled={true} contentContainerStyle={{alignItems: 'center', flexGrow: 1}} showsVerticalScrollIndicator={false}>

            <View style={styles.cabecalho}>
                <Image source={{ uri: imagem }} style={styles.img} />
                <View style={styles.info}>
                    <Text style={styles.titulo}>{titulo} </Text>
                    <Text style={styles.autor}>{autor} </Text>
                    <Text style={styles.editora}>Editora: <Text style={{fontStyle: 'italic' }}>{editora}</Text></Text> 
                    <FavoriteButton bookData={bookData} fontSize={22}/>
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
        fontWeight: '600', 
        lineHeight: 24, 
        letterSpacing: 0.3, 
        marginTop: 20, 
        marginBottom: 10,
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 12, 
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.09)',
        shadowColor: 'black',
        shadowOffset: {
            width: 0, 
            height: 3
        },
        shadowOpacity: 0.20,
        shadowRadius: 6,
    },
    img: {
        width: 150,
        height: 230,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'black',
    },
})