import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams, Link } from "react-router-dom";
import { fetchCasts, fetchMovieDetail, fetchSimilarMovie } from "../service";

export function MovieDetail() {
let genres = [];

  const {id} = useParams()
  const [detail, SetDetail] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      SetDetail(await fetchMovieDetail(id));
      setCasts(await fetchCasts(id));
      setSimilarMovie(await fetchSimilarMovie(id));
    };

    fetchAPI();
  }, [id])

  genres = detail.genres;

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return(
    <div className="container">
      <div className="row mt-2">
        <div className="col text-left" style={{height: 400, width: '100%'}}>
            <img className="img-fluid" src={`http://image.tmdb.org/t/p/original/${detail.poster}`}
            alt={detail.title}>
            </img>
            <div className="row mt-3">
              <div className="col">
                <ul className="list-inline">{genresList}</ul>
              </div>
            </div>
            <div
              className="carousel-captiom"
              style={{textAlign: "left", fontSize: 30}}
            >
              <ReactStars
                count={detail.vote_average}
                size={20}
                color={"#f4c8r"}></ReactStars>
              {detail.title} 
            </div>
        </div>
        
        <div className="col text-center" style={{textAlign: "left", fontSize: 18}}>
          {detail.overview}
        </div>
        <div className="col text-center" style={{textAlign: "left", fontSize: 18}}>
          {castList}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{color: "#5a686b", fontWeight: "bolder"}}>You Might Also Like This!</p>
        </div>
      </div>

      <div className="row mt-3">{similarMovieList}</div>
    </div>
  )
}