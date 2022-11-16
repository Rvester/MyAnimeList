import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

import { AnimeList } from "../components/AnimeList";
import { AnimeInfo } from "../components/AnimeInfo";
import { AddToList } from "../components/AddToList";
import { RemoveFromList } from "../components/RemoveFromList";
function Home() {
  const [search, setSearch] = useState("Dragonball");
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);

  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };
  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  };

  const getData = useCallback(
    debounce(async (query) => {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&sfw&limit=15`
      );
      const resData = await res.json();
      setAnimeData(resData.data);
    }, 500),
    []
  );

  useEffect(() => {
    getData(search);
  }, [search]);

  return (
    <>
      <div className="header">
        <h1>MAL</h1>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search your anime"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        <div className="animeInfo">
          {animeInfo && <AnimeInfo animeInfo={animeInfo} />}
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <AnimeList
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
            />
          </div>
          <h2 className="text-heading">My List</h2>
          <div className="row">
            <AnimeList
              animelist={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFromList}
              handleList={(anime) => removeFrom(anime)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
