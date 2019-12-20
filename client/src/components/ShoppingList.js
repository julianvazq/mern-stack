import React, { useContext } from "react";
import {Container, ListGroup, ListGroupItem, Button} from "reactstrap";
import { CSSTransition, TransitionGroup} from "react-transition-group";
import { ShoppingContext } from "../contexts/ShoppingContext";


const ShoppingList = () => {

    // Get items from ShoppingContext
    const { items, deleteItem} = useContext(ShoppingContext);

    return(
        <Container>
        <ListGroup>
            <TransitionGroup className="shopping-list">
                {items.map(({id, name}) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                        <ListGroupItem>
                            <Button className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={() => deleteItem(id)}
                            >
                             &times;   
                            </Button>
                            {name}
                        </ListGroupItem>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ListGroup>

        </Container>
    )
}

export default ShoppingList;