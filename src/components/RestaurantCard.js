import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, sla, costForTwo } = resData?.info;

  return (
    <div className="res-card">
      <img className="res-logo" src={CDN_URL + cloudinaryImageId} alt={name} />
      <div className="res-card-content">
        <h4>{name}</h4>
        <h5>{cuisines.join(" , ")}</h5>
        <h5>{avgRating}</h5>
        <h5>{sla.slaString}</h5>
        <h5>{costForTwo}</h5>
      </div>
    </div>
  );
}

export default RestaurantCard;

