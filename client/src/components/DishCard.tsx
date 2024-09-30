import React from "react";
import type { Dish } from '../types/dishTypes';
import {
  Card,
  CardHeader,
  Text,
  Caption1,
  Body1,
  makeStyles,
  mergeClasses,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    maxWidth: "30%",
    margin: "2rem auto",
    padding: "1.5rem",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    backgroundColor: "#fff",
    "@media (max-width: 600px)": {
      padding: "1rem",
    },
  },
  dishTitle: {
    marginBottom: "0.5rem",
    fontSize: "22px",
    fontWeight: "bold",
    "@media (max-width: 600px)": {
      fontSize: "20px",
    },
  },
  dishSubtitle: {
    marginBottom: "1rem",
    color: "#5a5a5a",
  },
  dishDetails: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    "@media (max-width: 450px)": {
      gridTemplateColumns: "1fr", // Stack the details on small screens
    },
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
  },
  detailLabel: {
    fontWeight: 600,
    color: "#444",
  },
  detailValue: {
    color: "#5a5a5a",
    textTransform: "capitalize",
  },
  previewImage: {
    borderRadius: "8px",
    maxHeight: "200px",
    objectFit: "cover",
    width: "100%",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  noDishText: {
    textAlign: "center",
    marginTop: "2rem",
  },
  capitalize: {
    textTransform: "capitalize",
  },
});

interface DishCardProps {
  dish: Dish;
  maxWidth?: string;
}

const sanitizeValues = (value: string, subValue: string = '') => {
    return value !== "-1" ? value + " " + subValue : 'NA';
}

const DishCard: React.FC<DishCardProps> = ({ dish,  maxWidth = "95%" }) => {
  const styles = useStyles();

  // Custom inline style for overriding maxWidth
  const customCardStyle = {
    maxWidth: maxWidth,
  };

  return (
    <Card className={styles.card} style={customCardStyle}>
      {/* Card Header */}
      <CardHeader
        header={
          <Body1 className={styles.dishTitle}>
            <b>{dish.name}</b>
          </Body1>
        }
        description={
          <Caption1
            className={mergeClasses(styles.dishSubtitle, styles.capitalize)}
          >
            {dish.course} {dish.region !== '-1' ? ` · ${dish.region}`: ''}
          </Caption1>
        }
      />
      {/* Dish Details */}
      <div className={styles.dishDetails}>
        <div className={styles.detailItem}>
          <Text className={styles.detailLabel}>Ingredients</Text>
          <Text className={styles.detailValue}>{dish.ingredients}</Text>
        </div>

        <div className={styles.detailItem}>
          <Text className={styles.detailLabel}>Diet</Text>
          <Text className={styles.detailValue}>{dish.diet}</Text>
        </div>

        <div className={styles.detailItem}>
          <Text className={styles.detailLabel}>Preparation Time</Text>
          <Text className={styles.detailValue}>{sanitizeValues(dish.prep_time, "minutes")}</Text>
        </div>

        <div className={styles.detailItem}>
          <Text className={styles.detailLabel}>Cooking Time</Text>
          <Text className={styles.detailValue}>{sanitizeValues(dish.cook_time, "minutes")}</Text>
        </div>

        <div className={styles.detailItem}>
          <Text className={styles.detailLabel}>Flavor Profile</Text>
          <Text className={styles.detailValue}>{sanitizeValues(dish.flavor_profile)}</Text>
        </div>

        <div className={styles.detailItem}>
          <Text className={styles.detailLabel}>State</Text>
          <Text className={styles.detailValue}>{sanitizeValues(dish.state)}</Text>
        </div>
      </div>

      {/* TBD: Add bookmark Feature */}
      {/* <CardFooter>
        <Button icon={<BookmarkAddRegular fontSize={16} />}>Bookmark</Button>
      </CardFooter> */}
    </Card>
  );
};

export default DishCard;
