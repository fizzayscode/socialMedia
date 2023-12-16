import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";

const Feed = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState([]);
  console.log(params);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const data = await axios.get("http://localhost:8080/api/v1/pins");
        console.log(data.data);
        setPins(data.data.pins);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPins();
  }, []);
  // const fetchRecentData = async () => {
  //   const realQuery = "limit=4";
  //   try {
  //     const data = await auth.searchAllListings(realQuery);
  //     setRecentData(data);
  //     fetchOfferData();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (loading)
    return <Spinner message="we are adding new resources to your feed..." />;
  return (
    <div>
      <div>
        {pins.map((pin) => {
          {
            console.log(pin);
          }
          return (
            <div key={pin.id}>
              <img width={100} src={pin.image} alt="" />
              <p>{pin.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
