import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Dish } from '../types/dishTypes';
import axios from "axios";
import {
  Text,
  Spinner,
  makeStyles,
} from "@fluentui/react-components";
import DishCard from "../components/DishCard";

const useStyles = makeStyles({
  spinner: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  noDishText: {
    textAlign: "center",
    marginTop: "2rem",
  }
});

const DishDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const styles = useStyles();

  useEffect(() => {
    axios
      .get(`/api/dishes/${name}`)
      .then((response) => {
        setDish(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dish data:", error);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <Spinner className={styles.spinner} label="Loading dish details..." />;
  }

  if (!dish) {
    return <Text className={styles.noDishText}>No dish found with the name: {name}</Text>;
  }

  return (
    <DishCard dish={dish}/>
  );
};

export default DishDetails;
