import React, { useState, useContext } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
  Badge
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MoviesContext } from './MoviesContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';
import MovieModal from './MovieModal';

const MovieList = () => {
  const { movies, isLoading, error, deleteMovie } = useContext(MoviesContext);

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
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
    setGenre('');

    setItemEditId(null);
  };

  const editMovie = (id, title, genre) => {
    toggle();
    setAddOrUpdate('Update');
    setTitle(title);
    setGenre(genre);
    setItemEditId(id);
  };

  return (
    <Container>
      <MovieModal
        modal={modal}
        title={title}
        genre={genre}
        id={itemEditId}
        toggle={toggle}
        addOrUpdate={addOrUpdate}
        resetFields={resetFields}
        setGenre={setGenre}
      />
      {/* NESTED TERNARY OPERATOR 
      isLoading ? <DelayedSpinner> :
       error ? <Alert> : 
       movies.length ? <ListGroup> : 
       <EmptyListMessage> */}
      {isLoading ? (
        <DelayedSpinner />
      ) : error ? (
        <Alert color='danger'>There was a problem with the request.</Alert>
      ) : movies.length ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {movies.map(({ _id, title, genre }) => (
              <CSSTransition key={_id} timeout={400} classNames='fade'>
                <ListGroupItem
                  color='warning'
                  className='list-group-item__inline'
                >
                  <Button
                    className='remove-btn remove-btn__inline'
                    color='danger'
                    size='sm'
                    onClick={() => deleteMovie(_id)}
                  >
                    &times;
                  </Button>
                  <p className='long-text-container'>{title}</p>
                  <div className='badge-container'>
                    <Badge
                      color='warning'
                      className='list-item-badge list-item-badge__inline'
                    >
                      {genre}
                    </Badge>
                  </div>
                  <Button
                    className='list-item-btn list-item-btn__inline'
                    color='secondary'
                    size='sm'
                    onClick={() => editMovie(_id, title, genre)}
                  >
                    Edit
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <EmptyListMessage itemType='movies' />
      )}
    </Container>
  );
};

export default MovieList;
