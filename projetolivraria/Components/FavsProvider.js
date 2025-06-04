import { createContext, useContext, useState } from "react";

const FavContext = createContext();

export function FavsProvider({children}){
    const [favorito, setFav] = useState([]);

    function addToFav(product){
        setFav((anterior) => [...anterior, product]);
    }

    return(
        <FavContext.Provider value={{favorito, addToFav}}>
            {children}
        </FavContext.Provider>
    )
}

export function useFav(){
    return useContext(FavContext);
}