import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import MasonryLayout from "../components/MasonryLayout";

const Feed = () => {
  const { id: categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        if (categoryId) {
          console.log(categoryId);
          setLoading(true);
          const data = await axios.get(
            `http://localhost:8080/api/v1/pins/ByCategory/${categoryId}`
          );
          setLoading(false);
          setPins(data.data.pins);
        } else {
          setLoading(true);
          const data = await axios.get("http://localhost:8080/api/v1/pins");
          setLoading(false);
          setPins(data.data.pins);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchPins();
  }, [categoryId]);

  if (loading)
    return <Spinner message="we are adding new resources to your feed..." />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
