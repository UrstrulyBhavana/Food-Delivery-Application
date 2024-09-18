import React, { useEffect, useState } from 'react'
import RestaurantCard from "./RestaurantCard";
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Body = () => {
 
    const [listOfRestaurants, setListOfRestaurant] = useState([]);

    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
      fetchData();
    }, []);


const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3787054&lng=78.55259869999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    console.log(json);
    setListOfRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    setFilteredRestaurant(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
  };

  const onlineStatus = useOnlineStatus();

  if( onlineStatus === false)
    return(
       <h1>Looks like you're Offline !! Please check your Internet Connection; </h1>
    );

  return listOfRestaurants.length === 0 ? ( 
      <Shimmer />
     ) : (
    <div className='body'>
        <div className='filter'>
            <div className='search'>
                <input type='text' 
                 className='search-box'
                 value={searchText}
                 onChange={(e) => {
                 setSearchText(e.target.value);
                 }}
                />
                <button className='searchBtn' 
                    onClick={() => {
                 // console.log(searchText)
                    const filteredRestaurant = listOfRestaurants.filter((res) => 
                    res.info.name.toLowerCase().includes(searchText.toLowerCase())
                    );
                   setFilteredRestaurant(filteredRestaurant);
                  } } > 
                    Search
                </button>
            </div>

            <button className='filter-btn' 
                onClick={ () => {

                const filteredList = listOfRestaurants.filter( 
                 (res) => res.info.avgRating > 4
                );

                setFilteredRestaurant(filteredList)
            }}>
                 Top Rated Restaurants
            </button>
        </div>

        <div className='res-container'>
            {
                filteredRestaurant.map((restaurant) => (

                  <Link key={restaurant.info.id} to={ "/restaurants/" + restaurant.info.id} className="Link">
                       <RestaurantCard   resData = {restaurant}/>
                  </Link> 
                ))
            }
        </div>
    </div>
)
}

export default Body

