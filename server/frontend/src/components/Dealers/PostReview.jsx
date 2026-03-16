import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';


const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("postreview"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let review_url = root_url+`djangoapp/add_review`;
  let carmodels_url = root_url+`djangoapp/get_cars`;

  const postreview = async ()=>{
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  if (json.status === 200) {
      window.location.href = window.location.origin+"/dealer/"+id;
  }

  }
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      if(dealerobjs.length > 0)
        setDealer(dealerobjs[0])
    }
  }

  const get_cars = async ()=>{
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }
  useEffect(() => {
    get_dealer();
    get_cars();
  },[]);


  return (
    <div>
      <Header/>
      <main className="page review-page">
        <section className="card-surface review-form-card">
          <div className="review-header">
            <span className="eyebrow">Add a review</span>
            <h1 className="section-title">{dealer.full_name}</h1>
            <p className="section-lead">Share your experience to help other drivers.</p>
          </div>

          <div className="review-form">
            <div className="field_group">
              <label className="field_label" htmlFor="review">Your review</label>
              <textarea
                id="review"
                className="field_input field_textarea"
                rows="6"
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="field_group">
                <label className="field_label" htmlFor="purchase-date">Purchase date</label>
                <input
                  id="purchase-date"
                  className="field_input"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="field_group">
                <label className="field_label" htmlFor="cars">Car make and model</label>
                <select
                  name="cars"
                  id="cars"
                  className="field_input"
                  defaultValue=""
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="" disabled hidden>Choose a car</option>
                  {carmodels.map(carmodel => (
                    <option
                      key={`${carmodel.CarMake}-${carmodel.CarModel}`}
                      value={carmodel.CarMake+" "+carmodel.CarModel}
                    >
                      {carmodel.CarMake} {carmodel.CarModel}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field_group">
                <label className="field_label" htmlFor="car-year">Car year</label>
                <input
                  id="car-year"
                  className="field_input"
                  type="number"
                  onChange={(e) => setYear(e.target.value)}
                  max={2023}
                  min={2015}
                />
              </div>
            </div>

            <div className="action_row">
              <button className="btn-main" onClick={postreview}>Post review</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
export default PostReview
