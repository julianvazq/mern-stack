import React, { useContext } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormText,
  FormFeedback,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { BooksContext } from './BooksContext';
import { useForm } from 'react-hook-form';

const BookModal = ({
  toggle,
  modal,
  title,
  author,
  id,
  addOrUpdate,
  resetFields
}) => {
  /* Title and Author are handled by react-hook-form because they require validation.
   * The values of the title and author forms are determined by defaultValue, coming
   * from props. These are initialized as empty strings, but passed
   * down their respective values when in editing mode
   */

  const { register, handleSubmit, errors } = useForm();
  const { addBook, updateBook } = useContext(BooksContext);

  const onSubmit = data => {
    const { title, author } = data;

    if (addOrUpdate === 'Add') {
      const input = { title, author };
      addBook(input);
    } else {
      const input = { id, title, author };
      updateBook(input);
    }

    resetFields();
    toggle();
  };

  return (
    <div>
      <Button
        color='dark'
        style={{ marginBottom: '2rem' }}
        onClick={() => {
          toggle();
          resetFields();
        }}
      >
        Add Book
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{addOrUpdate} Book</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for='title'>Book</Label>
              <Input
                invalid={
                  errors.title &&
                  (errors.title.type === 'required' ||
                    errors.title.type === 'maxLength')
                }
                type='text'
                name='title'
                id='title'
                defaultValue={title}
                placeholder='Book title...'
                innerRef={register({ required: true, maxLength: 50 })}
              />
              <FormFeedback>
                {errors.title &&
                  errors.title.type === 'maxLength' &&
                  `Max length is 50 characters.`}
              </FormFeedback>
              <FormText
                className={
                  errors.title && errors.title.type === 'required'
                    ? 'required-text-form'
                    : ''
                }
              >
                Required
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for='author'>Author</Label>
              <Input
                invalid={errors.author && errors.author.type === 'maxLength'}
                type='text'
                name='author'
                id='author'
                defaultValue={author}
                placeholder='Book author...'
                innerRef={register({ maxLength: 50 })}
              />
              <FormFeedback>
                {errors.author &&
                  errors.author.type === 'maxLength' &&
                  `Max length is 50 characters.`}
              </FormFeedback>
              <FormText>Optional</FormText>
            </FormGroup>
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              {addOrUpdate} Book
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BookModal;
