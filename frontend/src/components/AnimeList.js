import React from "react";
import axios from "axios";

export const AnimeList = ({
  animelist,
  animeComponent,
  setAnimeInfo,
  handleList,
  user,
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
                        console.log("onClick");
                        console.log({ user });
                        const userFavorite = {
                          username: user.username,
                          anime_id: anime.mal_id,
                        };
                        // const deleteFavorite = {
                        //   anime_id: anime.mal_id,
                        // };

                        const token = localStorage.getItem("token");
                        const config = {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        };
                        try {
                          const response = await axios.put(
                            "http://localhost:5000/users/favorites",
                            userFavorite,
                            config
                          );
                          console.log(response);
                        } catch (error) {
                          console.log(error);
                        }
                        // await axios.delete(
                        //   "http://localhost:5000/users/removeFavorites",
                        //   deleteFavorite,
                        //   config
                        // );
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
