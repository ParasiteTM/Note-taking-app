import { useState } from 'react';

import {
  Grid,
  Checkbox,
  Typography,
  Paper,
  Modal,
  Box,
  Divider,
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const NewTask = ({ items }) => {
  const [finished, setFinished] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [option, setOption] = useState(items.option.toLowerCase());
  const [title, setTitle] = useState(items.title);
  const [description, setDescription] = useState(items.description);
  const [modalEdit, setModalEdit] = useState(false);

  const [optionUpdate, setOptionUpdate] = useState(option.toLowerCase());
  const [titleUpdate, setTitleUpdate] = useState(title);
  const [descriptionUpdate, setDescriptionUpdate] = useState(description);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setFinished(true);
    } else {
      setFinished(false);
    }
  };

  const handleCancelUpdate = () => {
    setOptionUpdate(option);
    setTitleUpdate(title);
    setDescriptionUpdate(description);

    setModalEdit(false);
  };

  const handleUpdate = () => {
    setOption(optionUpdate);
    setTitle(titleUpdate);
    setDescription(descriptionUpdate);

    setModalEdit(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: '#fafafa',
    borderRadius: '2px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid item md={6} style={{ display: isDeleted ? 'none' : '' }}>
      <Paper
        style={{
          backgroundColor: finished
            ? '#717470'
            : option === 'work'
            ? '#5D6AC0'
            : option === 'personal'
            ? '#67BB6B'
            : '#FF9100',
          padding: '20px',
          transition: 'all 0.3s ease',
        }}
        elevation={1}
      >
        <Grid container alignItems="center">
          <Checkbox
            sx={{
              color: 'white',
              '&.Mui-checked': {
                color: 'white',
              },
            }}
            onClick={handleToggle}
          />
          <Typography
            style={{
              color: 'white',
              textDecoration: finished ? 'line-through' : '',
            }}
            variant="h5"
          >
            {title}
          </Typography>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <EditIcon
              className="icon"
              sx={{ color: 'white', opacity: '0.8' }}
              onClick={() => setModalEdit(true)}
            />
            <DeleteIcon
              className="icon"
              sx={{
                color: 'white',
                opacity: '0.8',
              }}
              onClick={() => setIsDeleted(true)}
            />
          </div>
        </Grid>
        <div
          style={{
            padding: '0 10px',
            color: '#f0f0f0',
            textDecoration: finished ? 'line-through' : '',
          }}
        >
          {description}
        </div>
      </Paper>
      {/*  */}
      {/*  */}
      {/*  */}
      <Modal open={modalEdit} onClose={() => setModalEdit(false)}>
        <Box style={modalStyle}>
          <Typography
            variant="h5"
            style={{ color: '#636362', padding: '20px' }}
          >
            Update note
          </Typography>
          <Divider />

          <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <Grid
              container
              style={{ justifyContent: 'space-between' }}
              spacing={2}
            >
              <Grid item md={8}>
                <TextField
                  style={{ width: '100%' }}
                  value={titleUpdate}
                  onChange={(e) => setTitleUpdate(e.target.value)}
                  placeholder="Add title..."
                ></TextField>
              </Grid>
              <Grid item md={4}>
                <Select
                  value={optionUpdate.toLowerCase()}
                  onChange={(e) => setOptionUpdate(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <MenuItem
                    value="personal"
                    onClick={() => setOptionUpdate('personal')}
                  >
                    personal
                  </MenuItem>
                  <MenuItem
                    value="work"
                    onClick={() => setOptionUpdate('work')}
                  >
                    work
                  </MenuItem>
                  <MenuItem
                    value="home"
                    onClick={() => setOptionUpdate('home')}
                  >
                    home
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item md={8}>
                <TextField
                  style={{ width: '100%' }}
                  placeholder="Add description..."
                  value={descriptionUpdate}
                  onChange={(e) => setDescriptionUpdate(e.target.value)}
                  multiline
                ></TextField>
              </Grid>
            </Grid>
            <Grid container direction="row-reverse">
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
              <Button onClick={handleCancelUpdate}>cancel</Button>
            </Grid>
          </Container>
        </Box>
      </Modal>
    </Grid>
  );
};

export default NewTask;
