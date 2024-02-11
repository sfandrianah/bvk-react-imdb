import * as React from 'react';
import { Badge, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { BASE_API_IMAGE, BASE_API_MOVIE, BASE_API_MOVIE_TOKEN } from '../constants/api';
import Color from 'color';
// import { alpha } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Star } from '@mui/icons-material';
import { db } from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import MovieCard from './MovieCard';



export default function Hero() {
  const [populars, setPopulars] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const genresDB = useLiveQuery(() => db.genres.toArray());
  console.log(genresDB);


  // https://image.tmdb.org/t/p/original/pqdR8zqAWF87chGYlbdYr0YfC7g.jpg
  const loadMovieListGenre = async () => {
    await fetch(`${BASE_API_MOVIE}/genre/movie/list?language=en`, {
      headers: {
        'Authorization': 'Bearer ' + BASE_API_MOVIE_TOKEN,
      }
    }).then(response => response.json())
      .then(data => {
        var responseJson = data.genres;
        setGenres(responseJson);
      })
      ;
  }

  const loadMovieListPopular = async () => {
    await fetch(`${BASE_API_MOVIE}/movie/popular?language=en-US&page=1`, {
      headers: {
        'Authorization': 'Bearer ' + BASE_API_MOVIE_TOKEN,
      }
    }).then(response => response.json())
      .then(data => {
        var responseJson = data.results;
        setPopulars(responseJson);
      })
      ;
  }

  React.useEffect(() => {
    // loadDataOnlyOnce();
    // loadMovieListPopular();
    // loadMovieListGenre();
  }, []);
  // console.log(populars);
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          pt: { xs: 14, sm: 15 },
          pb: { xs: 0, sm: 0 },
        }}
      >
      </Container>
    </Box>
  );
}
