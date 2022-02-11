import { useState } from 'react';
import NewTask from '../Components/NewTask';
import DummyText from '../Components/dummyData';

import {
  Container,
  InputBase,
  Button,
  Grid,
  Modal,
  Box,
  Typography,
  Divider,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.black, 0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  boxShadow: '0px 2px 5px #888888',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  opacity: '0.5',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
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
const StyledPersonalContainer = styled(Container)(() => ({
  paddingTop: '40px',
}));

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const index = () => {
  const [task, setTask] = useState(DummyText);
  const [option, setOptions] = useState('all'); //All Home Work Personal
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Personal');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleOnclickOption = (e) => {
    setOptions(e.target.value);
  };

  const handleAddNewTask = () => {
    let newTaskInfo = {
      title: newTaskTitle,
      option: newTaskCategory,
      description: newTaskDescription,
    };

    setTask([...task, newTaskInfo]);
    setOpen(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <StyledPersonalContainer>
        <Search style={{ marginLeft: '24px', marginRight: '24px' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search notes"
            inputProps={{ 'aria-label': 'Search notes' }}
            value={search}
            onChange={handleSearch}
          />
        </Search>
        <Container
          style={{ border: '2px solid black' }}
          style={{ display: 'flex', gap: '10px', paddingTop: '20px' }}
          className="optionsContainer"
        >
          <Button
            variant={option === 'all' ? 'contained' : ''}
            className="btn-options"
            onClick={handleOnclickOption}
            value="all"
          >
            All
          </Button>

          <Button
            variant={option === 'home' ? 'contained' : ''}
            className="btn-options"
            onClick={handleOnclickOption}
            value="home"
          >
            Home
            <div className="circleOrange"></div>
          </Button>

          <Button
            variant={option === 'work' ? 'contained' : ''}
            className="btn-options"
            onClick={handleOnclickOption}
            value="work"
          >
            Work
            <div className="circleBlue"></div>
          </Button>

          <Button
            variant={option === 'personal' ? 'contained' : ''}
            className="btn-options"
            onClick={handleOnclickOption}
            value="personal"
          >
            Personal
            <div className="circleGreen"></div>
          </Button>

          <Button
            variant="contained"
            style={{ marginLeft: 'auto' }}
            className="btn-add-note"
            onClick={() => setOpen(true)}
          >
            <AddIcon /> Add note
          </Button>

          <Modal open={open} onClose={() => setOpen(false)}>
            <Box style={modalStyle}>
              <Typography
                variant="h5"
                style={{ color: '#636362', padding: '20px' }}
              >
                Add new task
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
                      placeholder="Add title..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid item md={4}>
                    <Select
                      value={newTaskCategory.toLowerCase()}
                      onChange={(e) => setNewTaskCategory(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <MenuItem
                        value="personal"
                        onClick={() => setNewTaskCategory('personal')}
                      >
                        personal
                      </MenuItem>
                      <MenuItem
                        value="work"
                        onClick={() => setNewTaskCategory('work')}
                      >
                        work
                      </MenuItem>
                      <MenuItem
                        value="home"
                        onClick={() => setNewTaskCategory('home')}
                      >
                        home
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item md={8}>
                    <TextField
                      style={{ width: '100%' }}
                      placeholder="Add description..."
                      multiline
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid container direction="row-reverse">
                  <Button
                    onClick={handleAddNewTask}
                    variant="contained"
                    sx={{ marginLeft: '10px' }}
                  >
                    add
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    cancel
                  </Button>
                </Grid>
              </Container>
            </Box>
          </Modal>
        </Container>
        <Container style={{ paddingTop: '40px' }}>
          <Grid container spacing={2}>
            {task
              .map((items, idx) => {
                // console.log(<NewTask items={items} />);
                return <NewTask items={items} key={idx} />;
              })
              .filter((item) => {
                // console.log(item.props.items.option.toLowerCase());
                // console.log(item.props.items.option);
                let itemOption = item.props.items.option.toLowerCase();
                if (option === 'all') {
                  return item;
                } else if (itemOption === option) {
                  return item;
                }
              })
              .filter((item) => {
                if (search === '') {
                  return item;
                } else if (
                  item.props.items.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return item;
                } else {
                  return '';
                }
              })}
          </Grid>
        </Container>
      </StyledPersonalContainer>
    </div>
  );
};

export default index;
