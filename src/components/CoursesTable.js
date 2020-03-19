import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Login from './Login';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import {
  closeModal,
  openModal,
  addToCart,
  getCourses,
  removeFromCart
} from '../actions';

function sortHandler(courses, order, orderBy) {
  if (order === 'asc') {
    return courses.sort((a, b) =>
      a[orderBy] > b[orderBy] ? 1 : a[orderBy] < b[orderBy] ? -1 : 0
    );
  } else {
    return courses.sort((a, b) =>
      a[orderBy] < b[orderBy] ? 1 : a[orderBy] > b[orderBy] ? -1 : 0
    );
  }
}

const headCells = [
  { id: 'name', label: 'Name', sorting: false },
  { id: 'description', label: 'Description', sorting: false },
  { id: 'author', label: 'Author', sorting: false },
  { id: 'publishDate', label: 'PublishDate', sorting: true },
  { id: 'duration', label: 'Duration', sorting: true },
  { id: 'image', label: 'Image', sorting: false }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sorting ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography variant="h6" id="tableTitle">
                  {headCell.label}
                </Typography>
              </TableSortLabel>
            ) : (
              <Typography variant="h6" id="tableTitle">
                {headCell.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  message: {
    color: 'green'
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { search, change, login } = props;

  return (
    <Toolbar>
      {login && (
        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.message}
        >
          You have successfully logged in.
        </Typography>
      )}
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={search}
          onChange={change}
        />
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  button: {
    display: 'none'
  },
  hover: {
    '&:hover': {
      '& $button': {
        display: 'block'
      }
    }
  },
  modalPaper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    boxSizing: 'border-box'
  }
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

function CoursesTable(props) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('publishDate');
  const [search, setSearch] = useState('');
  const [id, setId] = useState(null);
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    props.onGetCourses();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const setSearchHandler = event => {
    setSearch(event.target.value);
  };

  const addBtnHandler = course => {
    props.onAddToCart(course);
  };

  const courses = props.courses.courses.map((course, index) => {
    return { ...course, id: index + '-' + course.name };
  });
  const filteredRows = courses.filter(
    course => course.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  const checkDuplicateItems = checkId => {
    if (props.cart.addedItems.find(id => id === checkId)) setId(checkId);
    else setId(null);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          search={search}
          change={setSearchHandler}
          login={props.login.isLogin}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="coursesTable"
            size={'medium'}
            aria-label="Courses table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortHandler(filteredRows, order, orderBy).map((row, index) => {
                return (
                  <TableRow
                    hover
                    key={row.name}
                    className={classes.hover}
                    onMouseEnter={() => checkDuplicateItems(row.id)}
                  >
                    <TableCell
                      component="th"
                      id={index}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center" center>
                      {row.description}
                    </TableCell>
                    <TableCell align="center">{row.author}</TableCell>
                    <TableCell align="center">{row.publishDate}</TableCell>
                    <TableCell align="center">{row.duration}</TableCell>
                    <TableCell align="center">
                      <Avatar alt={row.name} src={row.image} />
                    </TableCell>
                    {id !== row.id ? (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={
                          !props.login.isLogin
                            ? () => props.onOpenModal(row)
                            : () => addBtnHandler(row)
                        }
                      >
                        Add
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => props.onRemoveFromCart(row.id)}
                      >
                        Remove
                      </Button>
                    )}
                    {ReactDOM.createPortal(
                      <Modal
                        open={props.login.open}
                        onClose={props.onCloseModal}
                      >
                        <div className={classes.modalPaper} style={modalStyle}>
                          <Login />
                        </div>
                      </Modal>,
                      document.getElementById('modal-root')
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

const mapStateToProps = ({ login, courses, cart }) => {
  return { login, courses, cart };
};

const mapDispatchToProps = dispatch => {
  return {
    onCloseModal: () => dispatch(closeModal()),
    onOpenModal: course => dispatch(openModal(course)),
    onAddToCart: course => dispatch(addToCart(course)),
    onGetCourses: () => dispatch(getCourses()),
    onRemoveFromCart: (id) => dispatch(removeFromCart(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesTable);
