import React from "react";
import axios from "axios";

export const AnimeList = ({
  animelist,
  animeComponent,
  setAnimeInfo,
  handleList,
}) => {
  const AnimeComponent = animeComponent;
  return (
    <>
      {animelist
        ? animelist.map((anime, index) => {
            return (
              <div
                className="card"
                key={index}
                onClick={() => setAnimeInfo(anime)}
              >
                <img src={anime.images.jpg.large_image_url} alt="animeImage" />
                <div className="anime-info">
                  <h4>{anime.title}</h4>
                  <div className="overlay" onClick={() => handleList(anime)}>
                    <h4>{anime.title_japanese}</h4>
                    <h3>SYNOPSIS</h3>
                    <div className="synopsis">
                      <p>{anime.synopsis}</p>
                    </div>
                    <AnimeComponent
                      onClick={async () => {
                        await axios.post(
                          "http://localhost:5000/users/favorites/"
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        : "Not Found"}
    </>
  );
};
