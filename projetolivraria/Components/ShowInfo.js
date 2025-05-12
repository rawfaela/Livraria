import { View, ScrollView, Text, StyleSheet, Image } from "react-native";

export default function ShowInfo({route}){
    const { titulo, autor, preco, img, sinopse } = route.params;

    return(
        <ScrollView style={styles.container}  contentContainerStyle={{alignItems: 'center'}}>
            <Image source={{uri: img}}style={styles.img}/>
            <View style={{flex: 1, marginLeft:5 }}>
                <Text style={styles.txt}>{titulo} </Text>
                <Text style={styles.txt}>{autor} </Text>
                <Text style={styles.txt}>R${preco}</Text>
                <Text style={styles.txt}>{sinopse}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(208, 157, 231)",
        padding: 20,
        flexGrow: 1,
    },
    txt:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600',
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'rgb(46, 6, 83)',
    },

})