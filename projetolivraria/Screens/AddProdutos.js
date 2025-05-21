import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { db } from "../controller";
import { collection, addDoc } from 'firebase/firestore';

export default function AddProdutos() {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [editora, setEditora] = useState("");
    const [genero, setGenero] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");

    const addProduct = async () => {
        try {
            await addDoc(collection(db, "produtos"), {
                titulo,
                autor,
                sinopse,
                editora,
                genero,
                categoria,
                preco: parseFloat(preco),
                imagem,
            });
            alert("Produto adicionado com sucesso!");
            setTitulo("");
            setAutor("");
            setSinopse("");
            setEditora("");
            setGenero("");
            setCategoria("");
            setPreco("");
            setImagem("");
        } catch (error) {
            console.error("Erro ao adicionar produto: ", error);
            alert("Erro ao adicionar produto.");
        }
    };

    // opções de categoria únicas (como radio buttons)
    const toggleCategoria = (value) => {
        setCategoria(prev => (prev === value ? "" : value));
    };

    return (
    
        <View style={styles.container}>
            <Text style={styles.titulo}>Adicionar Produtos</Text>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
                <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor} />
                <TextInput style={styles.input} placeholder="Sinopse" value={sinopse} onChangeText={setSinopse} />
                <TextInput style={styles.input} placeholder="Gênero" value={genero} onChangeText={setGenero} />
                <TextInput style={styles.input} placeholder="Editora" value={editora} onChangeText={setEditora} />

                {/* Checkbox de categoria */}
                <View style={styles.checkboxContainer}>
                    <Text style={{fontSize: 20}}>CATEGORIA</Text>
                    <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCategoria("Livro")}>
                        <View style={styles.checkbox}>
                            {categoria === "Livro" && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={styles.checkboxLabel}>Livro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCategoria("HQ")}>
                        <View style={styles.checkbox}>
                            {categoria === "HQ" && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={styles.checkboxLabel}>HQ</Text>
                    </TouchableOpacity>
                </View>

                <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} />
                <TextInput style={styles.input} placeholder="Imagem" value={imagem} onChangeText={setImagem} />

                <TouchableOpacity style={styles.botao} onPress={addProduct}>
                    <Text style={{ color: 'white', fontSize: 26 }}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(214, 173, 233)',
    },
    input: {
        fontSize: 23,
        height: 50,
        width: '90%',
        margin: 10,
        color: 'white',
        borderColor: 'rgb(117, 64, 192)',
        borderWidth: 4,
        padding: 10,
        borderRadius: 7,
        backgroundColor: 'rgb(168, 128, 223)',
    },
    titulo: {
        marginTop: 30,
        marginBottom: 20,
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(46, 6, 83)',
        textShadowColor: 'rgba(136, 65, 202, 0.49)',
        textShadowOffset: { width: 2, height: 2 },
    },
    botao: {
        width: 200,
        height: 60,
        backgroundColor: 'rgb(138, 83, 214)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },

    // Checkbox personalizado
    checkboxContainer: {
        width: '90%',
        marginTop: 10,
        marginBottom: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 4,
        borderRadius: 7,
        backgroundColor: 'rgb(168, 128, 223)',
        borderColor: 'rgb(117, 64, 192)',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: 'white',
    },
    checkmark: {
        fontSize: 18,
        color: 'rgb(117, 64, 192)',
    },
    checkboxLabel: {
        fontSize: 23,
        color: 'white',
    },
});
