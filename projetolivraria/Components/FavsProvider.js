import { createContext, useContext, useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { db, auth } from '../controller';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const FavContext = createContext();

export function FavsProvider({children}){
    const [favorito, setFav] = useState([]);
    const [user, setUser] = useState(null);
    const [loadingFavs, setLoadingFavs] = useState(true);

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

    function isFavorited(id){
        return favorito.some(item => item.id === id);
    }

    return(
        <FavContext.Provider value={{favorito, addToFav, removeFromFav, isFavorited}}>
            {children}
        </FavContext.Provider>
    )
}

export function useFav(){
    return useContext(FavContext);
}

export function FavoriteButton({ bookData, style, fontSize = 20 }) {
    const { isFavorited, addToFav, removeFromFav } = useFav();
    const isBookFavorited = isFavorited(bookData.id);

    const handleFavoritar = () => {
        if (isBookFavorited) {
            removeFromFav(bookData.id);
        } else {
            addToFav(bookData);
        }
    };

    return (
        <TouchableOpacity 
            style={[
                {
                    backgroundColor: 'rgb(208, 222, 252)',
                    padding: 2,
                    borderRadius: 5,
                }, 
                isBookFavorited && { backgroundColor: 'rgb(255, 107, 107)' },
                style
            ]} 
            onPress={handleFavoritar}
        >
            <Text style={{textAlign: 'center', fontSize: fontSize, color: isBookFavorited ? '#fff' : '#000'}}>
                {isBookFavorited ? 'Favoritado ❤️' : 'Favoritar 🤍'}
            </Text>
        </TouchableOpacity>
    );
}