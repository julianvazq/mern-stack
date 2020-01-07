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
import { GoalsContext } from './GoalsContext';
import DelayedSpinner from '../DelayedSpinner';
import EmptyListMessage from '../EmpyListMessage';
import GoalModal from './GoalModal';

const GoalList = () => {
  const { goals, isLoading, error, deleteGoal } = useContext(GoalsContext);

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [timeline, setTimeline] = useState('Short-term');
  const [deadline, setDeadline] = useState('');
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

  const handleTimelineChange = timeline => {
    setTimeline(timeline);
  };

  const handleDeadlineChange = deadline => {
    setDeadline(deadline);
  };

  const resetFields = () => {
    setName('');
    setTimeline('Short-term');
    setDeadline('');
    setItemEditId(null);
  };

  const editGoal = (id, name, timeline, deadline) => {
    toggle();
    setAddOrUpdate('Update');
    setName(name);
    setTimeline(timeline);
    setDeadline(deadline);
    setItemEditId(id);
  };

  return (
    <Container>
      <GoalModal
        modal={modal}
        name={name}
        timeline={timeline}
        deadline={deadline}
        id={itemEditId}
        toggle={toggle}
        addOrUpdate={addOrUpdate}
        handleTimelineChange={handleTimelineChange}
        handleDeadlineChange={handleDeadlineChange}
        resetFields={resetFields}
      />
      {/* NESTED TERNARY OPERATOR 
      isLoading ? <DelayedSpinner> :
       error ? <Alert> : 
       goals.length ? <ListGroup> : 
       <EmptyListMessage> */}
      {isLoading ? (
        <DelayedSpinner />
      ) : error ? (
        <Alert color='danger'>There was a problem with the request.</Alert>
      ) : goals.length ? (
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {goals.map(({ _id, name, timeline, deadline }) => (
              <CSSTransition key={_id} timeout={400} classNames='fade'>
                <ListGroupItem
                  color='primary'
                  className='list-group-item__inline'
                >
                  <Button
                    className='remove-btn remove-btn__inline'
                    color='danger'
                    size='sm'
                    onClick={() => deleteGoal(_id)}
                  >
                    &times;
                  </Button>
                  <p className='long-text-container'>{name}</p>
                  <div className='badge-container'>
                    <Badge
                      color='secondary'
                      className='list-item-badge list-item-badge__inline date-badge'
                    >
                      {deadline}
                    </Badge>
                    <Badge
                      color='primary'
                      className='list-item-badge list-item-badge__inline'
                    >
                      {timeline}
                    </Badge>
                  </div>
                  <Button
                    className='list-item-btn list-item-btn__inline'
                    color='secondary'
                    size='sm'
                    onClick={() => editGoal(_id, name, timeline, deadline)}
                  >
                    Edit
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : (
        <EmptyListMessage itemType='goals' />
      )}
    </Container>
  );
};

export default GoalList;
