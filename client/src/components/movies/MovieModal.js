import React, { useState, useContext } from 'react';
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
import { MoviesContext } from './MoviesContext';
import { useForm } from 'react-hook-form';

const MovieModal = ({
  toggle,
  modal,
  title,
  genre,
  id,
  addOrUpdate,
  resetFields,
  setGenre
}) => {
  /* Title and Genre are handled by react-hook-form because they require validation.
   * The values of the title and genre forms are determined by defaultValue, coming
   * from props. These are initialized as empty strings, but passed
   * down their respective values when in editing mode
   */

  const { register, handleSubmit, errors } = useForm();
  const { addMovie, updateMovie } = useContext(MoviesContext);
  const [otherGenre, setOtherGenre] = useState(null);

  const onSubmit = data => {
    const { title, genre } = data;
    const genreInput = otherGenre ? otherGenre : genre;

    if (addOrUpdate === 'Add') {
      const input = { title, genreInput };
      addMovie(input);
    } else {
      const input = { id, title, genreInput };
      updateMovie(input);
    }
    setOtherGenre(null);
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
        Add Movie
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{addOrUpdate} Movie</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for='title'>Movie</Label>
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
                placeholder='Movie title...'
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
              <Label for='genre'>Genre</Label>
              <Input
                type='select'
                name='genre'
                id='genre'
                defaultValue={genre}
                placeholder='Movie genre...'
                innerRef={register}
                onChange={e => setGenre(e.target.value)}
              >
                <option></option>
                <option>Comedy</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Horror</option>
                <option>Action</option>
                <option>Sci-Fi</option>
                <option>Drama</option>
                <option>Fantasy</option>
                <option>Musical</option>
                <option>Documentary</option>
                <option>Adventure</option>
                <option>Animation</option>
                <option>Crime</option>
                <option>Western</option>
                <option>Other...</option>
              </Input>
              {genre === 'Other...' && (
                <div>
                  <Input
                    invalid={errors.otherInput}
                    type='text'
                    name='otherInput'
                    innerRef={register({ maxLength: 50 })}
                    onChange={e => setOtherGenre(e.target.value)}
                    style={{ marginTop: '1rem' }}
                  />
                  <FormFeedback className={errors.otherInput && 'd-block'}>
                    {errors.otherInput && 'Max length is 50 characters.'}
                  </FormFeedback>
                </div>
              )}
              <FormText>Optional</FormText>
            </FormGroup>
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              {addOrUpdate} Movie
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MovieModal;
