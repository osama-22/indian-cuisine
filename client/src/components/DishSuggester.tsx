import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Option,
  Button,
  makeStyles,
  SelectionEvents,
  OptionOnSelectData,
  Spinner,
  Text,
} from "@fluentui/react-components";
import axios from "axios";
import DishCard from "./DishCard";

const useStyles = makeStyles({
  suggesterContainer: {
    padding: "20px",
    textAlign: "center",
  },
  dropdown: {
    width: "50%",
    margin: "10px 0",
  },
  button: {
    marginLeft: "15px",
  },
  dishCardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
  },
});

interface Dish {
  name: string;
  ingredients: string;
  diet: string;
  prep_time: string;
  cook_time: string;
  flavor_profile: string;
  course: string;
  state: string;
  region: string;
}

const DishSuggester: React.FC = () => {
  const [availableIngredients, setAvailableIngredients] = useState<string[]>(
    []
  );
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(["Maida flour", "yogurt", "oil", "sugar"]);
  const [suggestedDishes, setSuggestedDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const styles = useStyles();

  // Fetch available ingredients from the API
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("/api/ingredients");
        setAvailableIngredients(response.data.ingredients); // Assuming the API returns { ingredients: [...] }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();
  }, []);

  const handleIngredientChange = (
    event: SelectionEvents,
    data: OptionOnSelectData
  ) => {
    setSelectedIngredients(data.selectedOptions);
  };

  const suggestDishes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/suggestions", {
        params: { ingredients: selectedIngredients },
      });
      const possibleDishes = response.data;
      setSuggestedDishes(possibleDishes);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.suggesterContainer}>
      <div>
        <Text size={600} as="h2" block style={{textAlign:'center'}}>Discover Dishes You Can Make</Text>
        <Text italic>
          Select ingredients from your pantry and find delicious dishes you can
          prepare right now!
        </Text>
      </div>
      <Dropdown
        placeholder="Select ingredients"
        multiselect={true}
        className={styles.dropdown}
        onOptionSelect={handleIngredientChange}
      >
        {availableIngredients.map((ingredient) => (
          <Option key={ingredient} value={ingredient}>
            {ingredient}
          </Option>
        ))}
      </Dropdown>

      <Button
        appearance="primary"
        className={styles.button}
        onClick={suggestDishes}
        disabled={loading || selectedIngredients.length === 0}
      >
        Suggest Dishes{" "}
        {loading ? (
          <Spinner style={{ marginLeft: "0.5rem" }} size="tiny" />
        ) : (
          ""
        )}
      </Button>
      {suggestedDishes.length > 0 && (
        <div className={styles.dishCardsContainer}>
          {suggestedDishes.map((dish) => (
            <DishCard key={dish.name} dish={dish} maxWidth="30%" />
          ))}
        </div>
      )}
    </div>
  );
};

export default DishSuggester;
