import { useState, useEffect } from "react";

const useLocalStorage=(key, initialVal=null)=>{
    const initialValue = localStorage.getItem(key) || initialVal;
    const [item,setItem] = useState(initialValue);

    

    useEffect(function setKeyInLocalStorage() {  
        if (item === null) {
            localStorage.removeItem(key);
          } else {
            localStorage.setItem(key, item);
          }
      }, [key, item]);
      return [item, setItem];

}
export default useLocalStorage;
