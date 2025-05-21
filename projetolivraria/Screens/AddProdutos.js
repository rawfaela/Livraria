import { Text, View, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
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

    // Renderer para web - usa elementos HTML nativos para garantir rolagem
    if (Platform.OS === 'web') {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: 'scroll',
                backgroundColor: 'rgb(214, 173, 233)',
                padding: '0 20px'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '800px',
                    margin: '0 auto',
                    paddingBottom: '50px'
                }}>
                    <h1 style={{
                        marginTop: '30px',
                        marginBottom: '20px',
                        fontSize: '35px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'rgb(46, 6, 83)',
                        textShadow: '2px 2px rgba(136, 65, 202, 0.49)'
                    }}>
                        Adicionar Produtos
                    </h1>
                    
                    <input 
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Título"
                        style={webInputStyle}
                    />
                    
                    <input 
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        placeholder="Autor"
                        style={webInputStyle}
                    />
                    
                    <textarea 
                        value={sinopse}
                        onChange={(e) => setSinopse(e.target.value)}
                        placeholder="Sinopse"
                        style={{
                            ...webInputStyle,
                            height: '100px',
                            resize: 'vertical'
                        }}
                    />
                    
                    <input 
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        placeholder="Gênero"
                        style={webInputStyle}
                    />
                    
                    <input 
                        value={editora}
                        onChange={(e) => setEditora(e.target.value)}
                        placeholder="Editora"
                        style={webInputStyle}
                    />
                    
                    <div style={{ width: '90%', marginTop: '10px', marginBottom: '10px' }}>
                        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'rgb(46, 6, 83)', marginBottom: '8px' }}>
                            CATEGORIA
                        </p>
                        
                        <div 
                            onClick={() => toggleCategoria("Livro")} 
                            style={webCheckboxRowStyle}
                        >
                            <div style={webCheckboxStyle}>
                                {categoria === "Livro" && <span style={{ fontSize: '18px', color: 'rgb(117, 64, 192)' }}>✓</span>}
                            </div>
                            <span style={{ fontSize: '23px', color: 'white' }}>Livro</span>
                        </div>
                        
                        <div 
                            onClick={() => toggleCategoria("HQ")} 
                            style={webCheckboxRowStyle}
                        >
                            <div style={webCheckboxStyle}>
                                {categoria === "HQ" && <span style={{ fontSize: '18px', color: 'rgb(117, 64, 192)' }}>✓</span>}
                            </div>
                            <span style={{ fontSize: '23px', color: 'white' }}>HQ</span>
                        </div>
                    </div>
                    
                    <input 
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        placeholder="Preço"
                        type="number"
                        style={webInputStyle}
                    />
                    
                    <input 
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        placeholder="Imagem (URL)"
                        style={webInputStyle}
                    />
                    
                    <button 
                        onClick={addProduct}
                        style={{
                            width: '200px',
                            height: '60px',
                            backgroundColor: 'rgb(138, 83, 214)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '10px',
                            marginTop: '20px',
                            marginBottom: '20px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ color: 'white', fontSize: '26px' }}>Enviar</span>
                    </button>
                </div>
            </div>
        );
    }

    // Renderer para mobile - mantém o código original React Native
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Adicionar Produtos</Text>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
                <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor} />
                <TextInput 
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
                    placeholder="Sinopse" 
                    value={sinopse} 
                    onChangeText={setSinopse}
                    multiline={true}
                    numberOfLines={4}
                />
                <TextInput style={styles.input} placeholder="Gênero" value={genero} onChangeText={setGenero} />
                <TextInput style={styles.input} placeholder="Editora" value={editora} onChangeText={setEditora} />

                {/* Checkbox de categoria */}
                <View style={styles.checkboxContainer}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'rgb(46, 6, 83)', marginBottom: 8}}>CATEGORIA</Text>
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

                <TextInput 
                    style={styles.input} 
                    placeholder="Preço" 
                    value={preco} 
                    onChangeText={setPreco}
                    keyboardType="numeric"
                />
                <TextInput style={styles.input} placeholder="Imagem" value={imagem} onChangeText={setImagem} />

                <TouchableOpacity style={styles.botao} onPress={addProduct}>
                    <Text style={{ color: 'white', fontSize: 26 }}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Estilos para a versão web
const webInputStyle = {
    fontSize: '23px',
    height: '50px',
    width: '90%',
    margin: '10px',
    color: 'white',
    borderColor: 'rgb(117, 64, 192)',
    borderWidth: '4px',
    padding: '10px',
    borderRadius: '7px',
    backgroundColor: 'rgb(168, 128, 223)',
    borderStyle: 'solid',
    boxSizing: 'border-box'
};

const webCheckboxRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '6px',
    marginBottom: '12px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '12px',
    paddingBottom: '12px',
    borderWidth: '4px',
    borderRadius: '7px',
    backgroundColor: 'rgb(168, 128, 223)',
    borderColor: 'rgb(117, 64, 192)',
    borderStyle: 'solid',
    cursor: 'pointer'
};

const webCheckboxStyle = {
    width: '24px',
    height: '24px',
    borderWidth: '2px',
    borderColor: 'white',
    borderStyle: 'solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
    backgroundColor: 'white'
};

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
    checkboxContainer: {
        width: '90%',
        marginTop: 10,
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