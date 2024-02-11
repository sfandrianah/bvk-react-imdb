import Dexie from 'dexie';
export const db = new Dexie('database');  // database is database name with 1 version 
db.version(1.1).stores({
    genres: '++id, name', // Primary key and indexed props
    movies_watched: '++id, title, genre_ids, poster_path, release_date, overview, popularity, vote_average', // Primary key and indexed props
});


// "adult": false,
//       "backdrop_path": "/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
//       "id": 438631,
//       "title": "Dune",
//       "original_language": "en",
//       "original_title": "Dune",
//       "overview": "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
//       "poster_path": "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
//       "media_type": "movie",
//       "genre_ids": [
//         878,
//         12
//       ],
//       "popularity": 287.963,
//       "release_date": "2021-09-15",
//       "video": false,
//       "vote_average": 7.785,
//       "vote_count": 10019