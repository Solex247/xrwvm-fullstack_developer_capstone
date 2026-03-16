import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png"
import neutral_icon from "../assets/neutral.png"
import negative_icon from "../assets/negative.png"
import review_icon from "../assets/reviewbutton.png"
import Header from '../Header/Header';

const Dealer = () => {


  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>)

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("dealer"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let reviews_url = root_url+`djangoapp/reviews/dealer/${id}`;
  let post_review = root_url+`postreview/${id}`;
  
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      setDealer(dealerobjs[0])
    }
  }

  const get_reviews = async ()=>{
    const res = await fetch(reviews_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      if(retobj.reviews.length > 0){
        setReviews(retobj.reviews)
      } else {
        setUnreviewed(true);
      }
    }
  }

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  }

  useEffect(() => {
    get_dealer();
    get_reviews();
    if(sessionStorage.getItem("username")) {
      setPostReview(
        <a className="btn-main dealer-cta" href={post_review}>
          <img src={review_icon} alt='Post Review'/>
          Post a review
        </a>
      )
    }
  },[]);  


return(
  <div>
      <Header/>
      <main className="page dealer-page">
        <section className="card-surface dealer-hero">
          <div>
            <span className="eyebrow">Dealer profile</span>
            <h1 className="section-title">{dealer.full_name}</h1>
            <p className="section-lead">
              {dealer['city']}, {dealer['address']}, Zip {dealer['zip']}, {dealer['state']}
            </p>
          </div>
          <div className="dealer-actions">
            {postReview}
          </div>
        </section>

        <section className="dealer-reviews">
          <div className="dealer-reviews-header">
            <h2 className="section-subtitle">Customer reviews</h2>
            <span className="review-count">{reviews.length} reviews</span>
          </div>
          {reviews.length === 0 && unreviewed === false ? (
            <div className="empty-state">Loading reviews...</div>
          ) : unreviewed === true ? (
            <div className="empty-state">No reviews yet.</div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <div className="review-card card-surface" key={`${review.id || review.name}-${index}`}>
                  <div className="review-card-header">
                    <img src={senti_icon(review.sentiment)} className="review-emoji" alt='Sentiment'/>
                    <span className={`sentiment-tag sentiment-${review.sentiment}`}>
                      {review.sentiment}
                    </span>
                  </div>
                  <p className="review-text">{review.review}</p>
                  <div className="reviewer">
                    {review.name} • {review.car_make} {review.car_model} {review.car_year}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
  </div>
)
}

export default Dealer
