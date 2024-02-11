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



export default function Populars() {
  const [populars, setPopulars] = React.useState([]);
  const loadMovieListPopular = async () => {
    await fetch(`${BASE_API_MOVIE}/movie/popular?language=en-US&page=1`, {
      headers: {
        'Authorization': 'Bearer ' + BASE_API_MOVIE_TOKEN,
      }
    }).then(response => response.json())
      .then(data => {
        var responseJson = data.results;
        setPopulars(responseJson);
      }).catch((e) => {

      });
    ;
  }

  React.useEffect(() => {
    loadMovieListPopular();
  }, []);
  return (
    <Box
      id="populars"
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          // pt: { xs: 14, sm: 15 },
          // pb: { xs: 8, sm: 12 },
        }}
      >
        <Typography variant="h6" sx={{ alignSelf: "start" }} gutterBottom>
          Popular Movies
        </Typography>
        <Grid container wrap="nowrap" spacing={8} sx={{ overflowX: 'auto' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {populars.map((value, index) => {
            return <MovieCard item={value} />
          })}
        </Grid>
      </Container>
    </Box>
  );
}
