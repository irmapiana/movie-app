import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams, Link } from "react-router-dom";
import { fetchCasts, fetchTvDetail, fetchSimilarTvShow } from "../service";

export function TvShowDetail() {
let genres = [];

  const {id} = useParams()
  const [detail, SetDetail] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarTvShow, setSimilarTvShow] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      SetDetail(await fetchTvDetail(id));
      setCasts(await fetchCasts(id));
      setSimilarTvShow(await fetchSimilarTvShow(id));
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
      </div>
    );
  });

  const similarTvShowList = similarTvShow.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
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
            <p style={{ fontWeight: "bolder" }}>{detail.name}</p>
          </div>
        </div>
      </div>
    );
  });

  return(
    <div className="container">
      <div className="row mt-2">
        <div className="col text-left" style={{height: 650, width: '100%'}}>
            <img className="img-fluid" src={`http://image.tmdb.org/t/p/original/${detail.poster_path}`}
            alt={detail.title}>
            </img>
            <div className="caption">
              <div className="row mt-3">
                <div className="col">
                  <ul className="list-inline" >{genresList}</ul>
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
                  <p style={{color:"white"}}> {detail.name} </p>
              </div>
            </div>
        </div>
        
        <div className="col text-left" style={{fontSize: 18}}>
          <h2>Synopsis</h2>
          <div style={{color:"grey"}}>
            {detail.overview}
          </div>
          <h2>Episode</h2>
          <div className="col text-left" style={{ width: '50%'}}>
            <img className="img-fluid" src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
              alt={detail.title}>
            </img>
            Episode : 
            {detail.number_of_episodes}
          </div>
          
        </div>
        <div className="col text-left" style={{fontSize: 12, fontWeight:"bold"}}>
          casts
          {castList}
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <h2>You Might Also Like This!</h2>
          <div className="gold" style={{textAlign: "right", fontSize:15}}>
            See All <i className="far fa-angle-right"></i>
          </div>
        </div>
      </div>

      <div className="row mt-3">{similarTvShowList}</div>
    </div>
  )
}