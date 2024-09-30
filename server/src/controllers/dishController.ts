import { Request, Response } from "express";
import dishes from "../data/indian_food.json";

// Get all dishes
export const getAllDishes = (req: Request, res: Response): void => {
  const query = req.query.q?.toString().toLowerCase() || ''; // Get the query parameter
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const diet = req.query.diet?.toString().toLowerCase();
  const course = req.query.course?.toString().toLowerCase();
  const region = req.query.region?.toString().toLowerCase();
  const cookTimeGte = req.query.cook_time
    ? parseInt((req.query.cook_time as { gte: string }).gte)
    : null;
  const cookTimeLte = req.query.cook_time
    ? parseInt((req.query.cook_time as { lte: string }).lte)
    : null;

  let filteredDishes;  
  if (query !== '') {
    // API is called from global search
    filteredDishes = query
    ? dishes.filter((dish) => 
        dish.name.toLowerCase().includes(query) || 
        dish.ingredients.toLowerCase().includes(query) ||
        dish.region.toLowerCase().includes(query) || 
        dish.state.toLowerCase().includes(query)
      )
    : dishes;
  } 
  else {
    // API is called from dishes grid
    filteredDishes = dishes.filter((dish) => {
      const matchDiet = diet ? dish.diet.toLowerCase() === diet : true;
      const matchCourse = course ? dish.course.toLowerCase() === course : true;
      const matchRegion = region ? dish.region.toLowerCase() === region : true;
      const matchCookTimeGte = cookTimeGte
        ? parseInt(dish.cook_time) >= cookTimeGte
        : true;
      const matchCookTimeLte = cookTimeLte
        ? parseInt(dish.cook_time) <= cookTimeLte
        : true;
  
      return (
        matchDiet &&
        matchCourse &&
        matchRegion &&
        matchCookTimeGte &&
        matchCookTimeLte
      );
    });
  }

  // Pagination logic
  const startIndex = (page - 1) * pageSize;
  const paginatedDishes = filteredDishes.slice(
    startIndex,
    startIndex + pageSize
  );

  res.status(200).json({
    dishes: paginatedDishes,
    total: filteredDishes.length,
    page,
    pageSize,
  });
};

// Get a specific dish by its name
export const getDishByName = (req: Request, res: Response): void => {
  const dishName = req.params.name.toLowerCase();
  const dish = dishes.find((d) => d.name.toLowerCase() === dishName);

  if (dish) {
    res.status(200).json(dish);
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
};

// Suggest dishes based on ingredients provided
export const getDishesByIngredients = (req: Request, res: Response): void => {
  const ingredients: string[] = req.query.ingredients
    ? req.query.ingredients.toString().split(",")
    : [];

  if (ingredients.length === 0) {
    res
      .status(400)
      .json({ message: "Please provide ingredients in the query parameters" });
  }

  console.log("ingredients", ingredients);
  const suggestedDishes = dishes.filter((dish) => {
    const dishIngredients = dish.ingredients.split(",").map((ingredient) => ingredient.trim().toLowerCase());
    return dishIngredients.every((ingredient) => 
      ingredients.includes(ingredient.toLowerCase())
    )}
  );

  if (suggestedDishes.length > 0) {
    res.status(200).json(suggestedDishes);
  } else {
    res
      .status(404)
      .json({ message: "No dishes found with the given ingredients" });
  }
};

export const getAllIngredients = (req: Request, res: Response): void => {
    // Initialize a Set to store unique ingredients
    const ingredientSet = new Set<string>();

    // Loop through each dish and extract ingredients
    dishes.forEach((dish) => {
      const ingredients = dish.ingredients.split(",").map((ingredient) => ingredient.trim().toLowerCase());
      ingredients.forEach((ingredient) => ingredientSet.add(ingredient));
    });
  
    const allIngredients = Array.from(ingredientSet);
    res.status(200).json({ ingredients: allIngredients });
};


export const getProtected = (req: Request, res: Response): void => {
  res.status(200).json({
    msg: "Successfully able to access protected route",
  });
};
