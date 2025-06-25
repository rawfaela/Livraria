import { createContext, useContext, useState, useEffect } from "react"; // hooks do React para trabalhar com estado e contexto
import { db, auth } from '../controller';
import { doc, setDoc, getDoc } from "firebase/firestore"; //funções do Firestore para ler e gravar documentos
import { onAuthStateChanged } from "firebase/auth"; //escuta quando o usuário entra ou sai da conta

const FavContext = createContext(); //cria o contexto que vai ser usado para compartilhar dados em outras telas -> context api, guarda dado,funcao afins
//nesse caso vai guarda os faboritos

export function FavsProvider({children}){
    const [favorito, setFav] = useState([]);
    const [user, setUser] = useState(null); //guarda favorito e usuario cadastrado
    const [loadingFavs, setLoadingFavs] = useState(true); //controle para carregar os favoritos

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, async (user)=>{
          setUser(user); 
          setLoadingFavs(true);
    
          if (user){
            try {
              const docRef = doc(db, 'favoritos', user.uid);
              const docSnap = await getDoc(docRef);
    
              if (docSnap.exists()){
                const data = docSnap.data();
                setFav(Array.isArray(data.products)? data.products: [])
              }
              else{
                setFav([]);
              }
            }
            catch (error){
              console.log('Erro no cart', error)
              setFav([]);
            }
          }
          else{
            setFav([]);
          }
    
          setLoadingFavs(false);
        })
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        async function saveFavs(lista) {
          if (!user || loadingFavs){
            return;
          }
          try {
            const docRef = doc(db,'favoritos', user.uid);
            await setDoc(docRef, {products:lista});
          }
          catch (error){
            console.log('erro ao salvar no firebase: ',error);
          }
        }
        saveFavs(favorito)
        }, [favorito, user, loadingFavs]);

    function addToFav(product){
        const alreadyFavorited = favorito.find(item => item.id === product.id);

        if (alreadyFavorited) {
            alert("Este produto já foi adicionado aos favoritos!");
        } else {
            console.log("Adicionando favorito:", product);
            setFav((anterior) => [...anterior, product]);
        }
    }

    function removeFromFav(id){
        setFav((prevFavoritos) => prevFavoritos.filter((item) => item.id !== id));
    }

    return(
        <FavContext.Provider value={{favorito, addToFav, removeFromFav}}>
            {children}
        </FavContext.Provider>
    )
}

export function useFav(){
    return useContext(FavContext);
}