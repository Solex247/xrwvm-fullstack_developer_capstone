import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  // let [state, setState] = useState("")
  let [states, setStates] = useState([])

  // let root_url = window.location.origin
  let dealer_url ="/djangoapp/get_dealers";
  
  let dealer_url_by_state = "/djangoapp/get_dealers/";
 
  const filterDealers = async (state) => {
    dealer_url_by_state = dealer_url_by_state+state;
    const res = await fetch(dealer_url_by_state, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let state_dealers = Array.from(retobj.dealers)
      setDealersList(state_dealers)
    }
  }

  const get_dealers = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let all_dealers = Array.from(retobj.dealers)
      let states = [];
      all_dealers.forEach((dealer)=>{
        states.push(dealer.state)
      });

      setStates(Array.from(new Set(states)))
      setDealersList(all_dealers)
    }
  }
  useEffect(() => {
    get_dealers();
  },[]);  


let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
return(
  <div>
      <Header/>

      <main className="page dealers-page">
        <section className="card-surface dealers-hero">
          <div>
            <span className="eyebrow">Dealer directory</span>
            <h1 className="section-title">Explore trusted dealerships</h1>
            <p className="section-lead">
              Browse verified dealers and filter by state to find the best match.
            </p>
          </div>
          <div className="dealers-filter">
            <label className="field_label" htmlFor="state">Filter by state</label>
            <select
              name="state"
              id="state"
              className="field_input"
              defaultValue=""
              onChange={(e) => filterDealers(e.target.value)}
            >
              <option value="" disabled hidden>Choose a state</option>
              <option value="All">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="card-surface dealers-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Dealer Name</th>
                <th>City</th>
                <th>Address</th>
                <th>Zip</th>
                <th>State</th>
                {isLoggedIn ? (
                  <th>Review</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {dealersList.map(dealer => (
                <tr key={dealer['id']}>
                  <td>{dealer['id']}</td>
                  <td><a href={'/dealer/'+dealer['id']}>{dealer['full_name']}</a></td>
                  <td>{dealer['city']}</td>
                  <td>{dealer['address']}</td>
                  <td>{dealer['zip']}</td>
                  <td>{dealer['state']}</td>
                  {isLoggedIn ? (
                    <td>
                      <a className="review-action" href={`/postreview/${dealer['id']}`}>
                        <img src={review_icon} className="review_icon" alt="Post Review"/>
                        Post
                      </a>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
  </div>
)
}

export default Dealers
