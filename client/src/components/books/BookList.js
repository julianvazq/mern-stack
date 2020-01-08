import React, { useState, useContext } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BooksContext } from './BooksContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';
import BookModal from './BookModal';

const BookList = () => {
  const { books, isLoading, error, deleteBook } = useContext(BooksContext);

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [addOrUpdate, setAddOrUpdate] = useState('Add');
  const [itemEditId, setItemEditId] = useState(null);

  const toggle = () => {
    setModal(!modal);
    /* Set modal action back to "Add" in case an item update changed it to "Update" beforehand
    Only do this once modal is closed (!modal) to prevent user from seeing this change */
    if (!modal && addOrUpdate === 'Update') {
      setAddOrUpdate('Add');
    }
  };

  const resetFields = () => {
    setTitle('');
    setAuthor('');

    setItemEditId(null);
  };

  const editBook = (id, title, author) => {
    toggle();
    setAddOrUpdate('Update');
    setTitle(title);
    setAuthor(author);
    setItemEditId(id);
  };

  return (
    <Container>
      <BookModal
        modal={modal}
        title={title}
        author={author}
        id={itemEditId}
        toggle={toggle}
        addOrUpdate={addOrUpdate}
        resetFields={resetFields}
      />
      {/* NESTED TERNARY OPERATOR 
      isLoading ? <DelayedSpinner> :
       error ? <Alert> : 
       books.length ? <ListGroup> : 
       <EmptyListMessage> */}
      {isLoading ? (
        <DelayedSpinner />
      ) : error ? (
        <Alert color='danger'>There was a problem with the request.</Alert>
      ) : books.length ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {books.map(({ _id, title, author }) => (
              <CSSTransition key={_id} timeout={400} classNames='fade'>
                <ListGroupItem
                  color='secondary'
                  className='list-group-item__inline'
                >
                  <Button
                    className='remove-btn remove-btn__inline'
                    color='danger'
                    size='sm'
                    onClick={() => deleteBook(_id)}
                  >
                    &times;
                  </Button>
                  <p className='long-text-container'>
                    {title} {author && `by ${author}`}
                  </p>
                  <Button
                    className='list-item-btn list-item-btn__inline'
                    color='secondary'
                    size='sm'
                    onClick={() => editBook(_id, title, author)}
                  >
                    Edit
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <EmptyListMessage itemType='books' />
      )}
    </Container>
  );
};

export default BookList;
