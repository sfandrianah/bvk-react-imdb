import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import LogoMain from '../icons/LogoMain';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Avatar, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemText, Menu, OutlinedInput, TextField } from '@mui/material';
import genres from '../data/genres.json';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PersonIcon from '@mui/icons-material/Person';
import { db } from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { BASE_API_IMAGE } from '../constants/api';
import CancelIcon from '@mui/icons-material/Cancel';

const logoStyle = {
  // width: '140px',
  // height: 'auto',
  marginLeft: '20px',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  let moviesWatched = useLiveQuery(() => db.movies_watched.toArray());
  let genres = useLiveQuery(() => db.genres.toArray());
  const [openMovie, setOpenMovie] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);

  const handleClickOpenMovie = () => {
    setOpenMovie(true);
  };

  const handleCloseMovie = () => {
    setOpenMovie(false);
  };
  if (moviesWatched == null) {
    moviesWatched = [];
  }
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };
  React.useEffect(() => {
    // loadDataOnlyOnce();
    // loadMovieListPopular();
    // loadMovieListGenre();
  }, [moviesWatched]);
  // console.log(moviesWatched);
  var video = "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_5mb.mp4";
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}

      >

        <Container maxWidth="lg">

          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            {/* <Box
              sx={{
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label="fullWidth" id="fullWidth" />
            </Box> */}
            <Box
              sx={{
                flexGrow: 10,
                // width: "100%",
                alignSelf: 'center',
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              {/* <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo of sitemark"
              /> */}
              <LogoMain style={logoStyle} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {/* <Box> */}
                {/* <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                  />
                </FormControl> */}
                {/* <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (

                    <React.Fragment>
                      <Button variant="contained" {...bindTrigger(popupState)}>
                        Dashboard
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>Profile</MenuItem>
                        <MenuItem onClick={popupState.close}>My account</MenuItem>
                        <MenuItem onClick={popupState.close}>Logout</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState> */}
                <TextField
                  fullWidth
                  sx={{ m: 3 }}
                  // style={{ display: { xs: { width: 800 } } }}
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  aria-label="Enter Search Movies"
                  placeholder="Enter Search Movies ..."
                  // style={{ width: "100%" }}
                  // inputProps={{
                  //   autocomplete: 'off',
                  //   ariaLabel: 'Enter your email address',
                  // }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        // onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="start"
                      >
                        <FilterAltIcon />
                        {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                      </IconButton>
                    </InputAdornment>,
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          // onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          <SearchIcon />
                          {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                        </IconButton>

                      </InputAdornment>

                  }}
                />
                {/* <Button variant="outlined" size="medium" color="primary">
                  <FilterAltIcon />
                </Button> */}
                {/* <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <MenuItem
                        // onClick={() => scrollToSection('features')}
                        {...bindTrigger(popupState)}
                        sx={{ py: '6px', px: '12px' }}
                      >
                        <Typography variant="body2" color="text.primary">
                          Genre
                        </Typography>

                      </MenuItem>
                      <Menu {...bindMenu(popupState)}>
                        {genres.map((value, index) => {
                          console.log(value);
                          return <MenuItem onClick={popupState.close}>{value}</MenuItem>
                        }
                        )}
                      </Menu>
                    </React.Fragment>
                  )}

                </PopupState>
                <MenuItem
                  onClick={() => scrollToSection('testimonials')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Testimonials
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('highlights')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Highlights
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('pricing')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem> */}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      // component="a"
                      // href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      {...bindTrigger(popupState)}
                    >
                      <LibraryAddIcon />
                      Watched List
                    </Button>

                    <Menu  {...bindMenu(popupState)}>
                      {moviesWatched.map((item, index) => {
                        // console.log(value)
                        var imageUrl = `${BASE_API_IMAGE}/original${item.poster_path}`;
                        var genreStrings = "";
                        if (genres != null && typeof genres == "object") {
                          for (var no = 0; no < genres.length; no++) {
                            // if(genres[no].id == )
                            for (var no_1 = 0; no_1 < item.genre_ids.length; no_1++) {
                              if (genres[no].id == item.genre_ids[no_1]) {
                                genreStrings += genres[no].name + ", ";
                              }
                            }
                          }
                        }

                        let timeStamp = Date.parse(item.release_date);
                        var date = new Date(timeStamp);
                        var movieYear = date.getFullYear();
                        return <MenuItem onClick={popupState.close}>
                          <Card sx={{ display: 'flex', width: "100%" }} >
                            <CardMedia
                              component="img"
                              sx={{ width: 100 }}
                              image={imageUrl}
                              alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                  {item.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                  {genreStrings}
                                </Typography>
                                <Typography variant="subtitle2" color="lightgreen" component="div">
                                  Year : {movieYear}
                                </Typography>
                                <Typography variant="subtitle2" color="gold" component="div">
                                  Rating : {item.vote_average}
                                </Typography>
                              </CardContent>
                            </Box>

                          </Card>
                        </MenuItem>
                        // return <MenuItem onClick={popupState.close}>{value}</MenuItem>
                      }
                      )}
                    </Menu>
                  </React.Fragment>
                )}

              </PopupState>

              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                // href="/material-ui/getting-started/templates/sign-in/"
                target="_blank"
              >
                {/* Sign in */}
                <PersonIcon />
              </Button>

            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('features')}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('testimonials')}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('pricing')}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-in/"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={"lg"}
          open={open}
          onClose={handleCloseMovie}
        >
          <DialogTitle sx={{ textAlign: "right" }}>
            <IconButton onClick={handleCloseMovie}><CancelIcon color={"error"} />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: "center" }}>
              <video
                width="auto"
                height="500"
                controls >
                <source src={video} type="video/mp4" />
              </video>
            </Box>
          </DialogContent>
        </Dialog>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
