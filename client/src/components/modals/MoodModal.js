// import React, { useState, useContext } from 'react';
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   FormGroup,
//   Label,
//   Input
// } from 'reactstrap';
// import { MoodContext } from '../../contexts/MoodContext';

// const MoodModal = props => {
//   const { addItem } = useContext(MoodContext);
//   const [modal, setModal] = useState(false);
//   const [mood, setMood] = useState('-');

//   const toggle = () => setModal(!modal);

//   //   const handleMoodChange = e => {
//   //     e.preventDefault();
//   //     setName(e.target.value);
//   //   };

//   const onSubmit = e => {
//     e.preventDefault();
//     addItem({ mood }, 'moods');
//     setMood('-');
//     toggle();
//   };

//   return (
//     <div>
//       <Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
//         Add Mood
//       </Button>

//       <Modal isOpen={modal} toggle={toggle}>
//         <ModalHeader toggle={toggle}>Add To Mood List</ModalHeader>
//         <ModalBody>
//           <Form onSubmit={onSubmit}>
//             <FormGroup>
//               <Label for='mood'>Mood</Label>
//               <Input type='select' name='select' id='mood'>
//                 <option>1</option>
//                 <option>2</option>
//                 <option>3</option>
//                 <option>4</option>
//                 <option>5</option>
//               </Input>
//               <FormGroup />
//               <FormGroup>
//                 <Label for='thought'>Thoughts</Label>
//                 <Input type='textarea' name='text' id='thought' />
//               </FormGroup>
//               <Button color='dark' style={{ marginTop: '2rem' }} block>
//                 Add Mood
//               </Button>
//             </FormGroup>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default MoodModal;
