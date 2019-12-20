import React, {createContext, useState} from 'react';
import uuid from 'uuid';

export const ShoppingContext = createContext();

const ShoppingContextProvider = props => {

    const [items, setItems] = useState([
        {id: uuid(), name:"Oreos"},
        {id: uuid(), name:"Cookie dough"},
        {id: uuid(), name:"Cheerios"},
        {id: uuid(), name:"Butter"}
    ]);
    const deleteItem = id => {
        setItems(items.filter(item => item.id !== id))
    }
    const addItem = name => {
        setItems([...items, {id: uuid(), name}]);
    }

    return(
        <ShoppingContext.Provider value={{items, deleteItem, addItem}}>
            {props.children}
        </ShoppingContext.Provider>
    )
}

export default ShoppingContextProvider;