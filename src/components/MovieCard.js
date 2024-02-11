import * as React from 'react';
import { Badge, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, alpha } from '@mui/material';
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
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import CancelIcon from '@mui/icons-material/Cancel';

export default function MovieCard(props) {
    const { item = {} } = props;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const genres = useLiveQuery(() => db.genres.toArray());

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
    }, []);
    var value = item;
    var imageUrl = `${BASE_API_IMAGE}/original${item.poster_path}`;
    var genreStrings = "";
    if (genres != null) {
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

    const addMovieList = async (item) => {
        // movies: '++id, title, genre_ids, poster_path, release_date, overview, popularity, vote_average ', // Primary key and indexed props
        await db.movies_watched.put({
            id: item.id,
            title: item.title,
            genre_ids: item.genre_ids,
            poster_path: item.poster_path,
            release_date: item.release_date,
            overview: item.overview,
            popularity: item.popularity,
            vote_average: item.vote_average,

        });
    }
    var video = "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_5mb.mp4";
    return (
        <>

            {/*  */}
            <Grid item xs={6}>
                {/* <Badge color="secondary"  badgeContent={<>TES</>}> */}
                <Card sx={{ maxWidth: 250, minWidth: 250 }}>
                    <CardActionArea>
                        <div style={{ position: "relative" }}>
                            <CardMedia
                                component="img"
                                height="175"
                                image={imageUrl}

                                alt="green iguana"
                                onClick={handleClickOpen}
                            />
                            <div style={{ position: "absolute", color: "white", top: 10, width: "100%" }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    // alignItems: 'center',

                                }}>
                                    {/* <Button  sx={{ backgroundColor: Color('#000000').alpha(0.8).string() }} 
                          // color='white'
                          size='small' startIcon={<Star color={"gold"} sx={{ width: 16 }} />}>
                            100
                          </Button> */}

                                    <div
                                        style={{
                                            paddingLeft: "5px",
                                            paddingRight: "10px",
                                            backgroundColor: Color('#000000').alpha(0.8).string(), display: 'flex',
                                            color: "gold",
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                        }}>
                                        <Star color={"gold"} sx={{ width: 16 }} />
                                        <span>{value.vote_average}</span>
                                    </div>
                                    <div
                                        style={{
                                            paddingLeft: "5px",
                                            paddingRight: "10px",
                                            backgroundColor: Color('#000000').alpha(0.8).string(), display: 'flex',
                                            color: "lightgreen",
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                        }}>
                                        {/* <Star color={"gold"} sx={{ width: 16 }} /> */}
                                        <span>{movieYear}</span>
                                    </div>
                                    {/* <Typography variant="body2" color="text.secondary" bgcolor={'black'}>
                            100
                          </Typography> */}
                                </div>

                            </div>
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {value.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {genreStrings}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="warning" onClick={() => addMovieList(item)}
                                variant="contained"><AddCircleOutlineIcon /> Add to Watch List</Button>
                        </CardActions>
                    </CardActionArea>
                </Card>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={"lg"}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle sx={{ textAlign: "right" }}>
                        <IconButton onClick={handleClose}><CancelIcon color={"error"} />
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
            </Grid>
        </>
    );
}
