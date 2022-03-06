import React, { useEffect, useState } from "react";
import RBCarousel from "react-bootstrap-carousel";
import { fetchMovies, fetchMovieByGenre, fetchTvShow, fetchMoviePopular } from "../service";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Button } from "react-bootstrap";

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

export function Home() {
  let genres = [];

    const [nowPlaying, setNowPlaying] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [tvShow, setTvShow] = useState([]);
    const [popularMovie, setPopularMovie] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setMovieByGenre(await fetchMovieByGenre());
            setTvShow(await fetchTvShow());
            setPopularMovie(await fetchMoviePopular());
        };

        fetchAPI();
    }, []);

     let genresList;
    if (genres) {
      genresList = genres.map((g,i) => {
        return (
          <li className="list-inline-item" key={i}>
            <button type="button" className="btn btn-outline-info">
              {g.name}
            </button>
          </li>
        )
      })
    }

    const movies = nowPlaying.slice(0, 5).map((item, index) => {
        return(
            <div style={{ height: 500, width: "100%"}} key={index}>
               <div className="carousel-center">
                 <div className="item active">
                   <img style={{height: 600}} src={item.backPoster} alt={item.title}/>
                 </div>
                </div> 
                <div className="carousel-caption" style={{textAlign: "left"}}>
                    <ReactStars
                      count={item.rating}
                      size={20}
                      color1={"#f4c10f"}
                    ></ReactStars>
                    <h1>{item.title}</h1>
                    <p style={{fontSize: 15, width: "50%"}}>{item.overview}</p>
                    <Button style={{border: '1px solid',borderRadius: '30px'}} variant="outline-warning">Watch Now</Button>
                </div>

            </div>
        )
    });

    const movieList = movieByGenre.slice(0, 4).map((item, index) => {
        return (
          <div className="col-md-3 col-sm-6" key={index}>
            <div className="card">
              <Link to={`/movie/${item.id}`}>
                <img className="img-fluid" src={item.poster} alt={item.title}></img>
              </Link>
            </div>
            <div className="title">
              <div className="mt-3">
                <ReactStars
                  count={item.rating}
                  size={20}
                  color1={"#fffff"}
                ></ReactStars>
                <p style={{ fontWeight: "bolder" }}>{item.title}</p>
              </div>
            </div>
          </div>
        );
      });

      const tvShowList = tvShow.slice(0, 4).map((item, index) => {
        return (
          <div className="col-md-3" key={index}>
            <div className="card">
              <Link to={`/tv/${item.id}`}>
                <img className="img-fluid" src={item.poster} alt={item.title}></img>
              </Link>
            </div>
            <div className="title">
              <div className="mt-3">
                <ReactStars
                  count={item.rating}
                  size={20}
                  color1={"#f4c10f"}
                ></ReactStars>
                <p style={{ fontWeight: "bolder" }}>{item.title}</p>
              </div>
            </div>
          </div>
        );
      });

      const popularMovieList = popularMovie.slice(0, 4).map((item, index) => {
        return (
          <div className="col-md-3" key={index}>
            <div className="card">
              <Link to={`/movie/${item.id}`}>
                <img className="img-fluid" src={item.poster} alt={item.title}></img>
              </Link>
            </div>
            <div className="title">
              <div className="mt-3">
                <ReactStars
                  count={item.rating}
                  size={20}
                  color1={"#f4c10f"}
                ></ReactStars>
                <p style={{ fontWeight: "bolder" }}>{item.title}</p>
              </div>
            </div>
          </div>
        );
      });

    
    return(
        <div className="container">
            <div className="row mt-2">
                <div className="col">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={5000}
                        version={4}
                        indicator={false}
                    >
                        {movies}
                    </RBCarousel>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                      <h2>New Realese</h2>
                    <div className="gold" style={{textAlign: "right", fontSize:15}}>
                        See All <i className="far fa-angle-right"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{movieList}</div>

            <div className="row mt-3">
                <div className="col">
                  <h2>Tv Show</h2>
                    <div className="gold" style={{textAlign: "right", fontSize:15}}>
                        See All <i className="far fa-angle-right"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{tvShowList}</div>

            <div className="row mt-3">
                <div className="col">
                  <h2>Popular</h2>
                    <div className="gold" style={{textAlign: "right", fontSize:15}}>
                        See All <i className="far fa-angle-right"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{popularMovieList}</div>
        </div>
    )
}