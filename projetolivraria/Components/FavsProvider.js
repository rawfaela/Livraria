import { createContext, useContext, useState } from "react";

const FavContext = createContext();

export function FavsProvider({children}){
    const [favorito, setFav] = useState([]);

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