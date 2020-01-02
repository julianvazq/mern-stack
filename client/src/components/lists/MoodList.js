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
import { MoodsContext } from '../../contexts/MoodsContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';
import MoodModal from '../modals/MoodModal';

const MoodList = () => {
  // Get items from ShoppingContext
  const {
    moods,
    deleteMood,
    addMood,
    updateMood,
    isLoading,
    error
  } = useContext(MoodsContext);
  const [modal, setModal] = useState(false);
  const [thought, setThought] = useState(undefined);
  const [mood, setMood] = useState(undefined);
  const [addOrUpdate, setAddOrUpdate] = useState('Add');
  const [itemEditId, setItemEditId] = useState(null);

  const toggle = () => {
    setModal(!modal);
    /* Set modal action back to "Add" in case an item update changed it to "Update" beforehand */
    if (!modal && addOrUpdate === 'Update') {
      setAddOrUpdate('Add');
    }
  };

  const handleMoodChange = mood => setMood(mood);
  const handleThoughtChange = thought => {
    setThought(thought);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (addOrUpdate === 'Add') {
      const input = { mood, thought };
      addMood(input);
    } else {
      const input = { itemEditId, mood, thought };
      updateMood(input);
    }
    resetFields();
    toggle();
  };

  const resetFields = () => {
    setMood(undefined);
    setThought(undefined);
    setItemEditId(null);
  };

  const editMood = (id, mood, thought) => {
    toggle();
    setAddOrUpdate('Update');
    setMood(mood);
    setThought(thought);
    setItemEditId(id);
  };

  const conditionalRendering = mood => {
    switch (mood) {
      case 1:
        return 'danger';
      case 2:
        return 'warning';
      case 3:
        return 'primary';
      case 4:
        return 'info';
      case 5:
        return 'success';
      default:
        return;
    }
  };

  return (
    <Container>
      <MoodModal
        modal={modal}
        mood={mood}
        thought={thought}
        addOrUpdate={addOrUpdate}
        toggle={toggle}
        handleMoodChange={handleMoodChange}
        handleThoughtChange={handleThoughtChange}
        resetFields={resetFields}
        onSubmit={onSubmit}
      />
      {isLoading && <DelayedSpinner />}
      {/* NESTED TERNARY OPERATOR - items.length ? <ListGroup> : error ? <Alert> : <EmptyListMessage> */}
      {moods.length ? (
        <ListGroup>
          <TransitionGroup className='mood-list'>
            {moods.map(({ _id, mood, thought }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem
                  className='list-group-item__mood'
                  color={conditionalRendering(mood)}
                >
                  <Button
                    className='remove-btn remove-btn__mood'
                    color='danger'
                    size='sm'
                    onClick={() => deleteMood(_id)}
                  >
                    &times;
                  </Button>
                  <p className='thought-container'>
                    {thought}
                    {console.log(thought.length)}
                  </p>
                  <Badge
                    color={conditionalRendering(mood)}
                    className='list-item-badge list-item-badge__mood'
                  >
                    {' '}
                    Mood: {mood}
                  </Badge>
                  <Button
                    className='list-item-btn list-item-btn__mood'
                    color='secondary'
                    size='sm'
                    onClick={() => editMood(_id, mood, thought)}
                  >
                    Edit
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : error ? (
        <Alert color='danger'>There was a problem with the request :(</Alert>
      ) : (
        <EmptyListMessage itemType='moods' isLoading={isLoading} />
      )}
    </Container>
  );
};

export default MoodList;
