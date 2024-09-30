import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BowlSaladFilled } from '@fluentui/react-icons'
import {
  Spinner,
  makeStyles,
  SearchBox,
  SearchBoxChangeEvent,
  InputOnChangeData,
  Link,
  Image,
  Menu,
  MenuTrigger,
  MenuList,
  MenuPopover,
  MenuItem,
  Avatar,
  Button,
} from "@fluentui/react-components"; // Import SearchBox
import { List, ListItem } from "@fluentui/react-list-preview"; // Import List and ListItem
import axios from "axios";

interface Dish {
  name: string;
  ingredients: string;
  region: string;
  state: string;
}

// Fluent UI custom styling hook
const useStyles = makeStyles({
  header: {
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    fontSize: "24px",
    color: "#0078d4",
    fontWeight: "bold",
  },
  searchContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: "8px",
  },
  searchBox: {
    width: "100%",
  },
  suggestionsList: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    backgroundColor: "white",
    padding: "8px",
    position: "absolute",
    marginTop: "2.75rem",
    zIndex: 1,
  },
  listItem: {
    padding: "8px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f3f2f1",
    },
  },
  logo: {
    height: "75px",
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
  },
  profileName: {
    marginRight: "10px",
    fontWeight: "bold",
  },
  profileButton: {
    cursor: "pointer",
    color: "#0078d4",
  },
  spinner: {
    marginLeft: "1.5rem",
  },
  profileAvatar: {
    cursor: "pointer",
  },
});

const Header: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, logout } = useContext(UserContext); // Access user and logout from context
  const navigate = useNavigate();
  const styles = useStyles(); // Use Fluent UI custom styles

  // Function to fetch suggestions based on user input
  const fetchSuggestions = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/dishes", {
        params: { q: searchQuery },
      });
      setSuggestions(response.data.dishes);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change and fetch suggestions
  const handleSearchChange = (
    event: SearchBoxChangeEvent,
    data: InputOnChangeData
  ) => {
    const value = data.value;
    if (value) {
      setQuery(value);
      if (value.length >= 2) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setQuery("");
    }
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (query) {
      navigate(`/dishes/${query}`);
      setSuggestions([]);
      setQuery("");
    }
  };

  const handleSuggestionClick = (dishName: string) => {
    setSuggestions([]);
    setQuery("");
    navigate(`/dishes/${dishName}`);
  };

  // Logout Functionality
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page
  };

  const handleLoginClick = () => {
    navigate("/login");
  }

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className={styles.header}>
      <Link className={styles.title} href={"/"}>
        <Image
          className={styles.logo}
          src={"/images/indian-cuisine-logo-2.png"}
        ></Image>
      </Link>

      <div className={styles.searchContainer}>
        {/* Search Box with Fluent UI Styling */}
        <SearchBox
          placeholder="Search for dishes, ingredients, or origin..."
          value={query}
          size="large"
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit} // Handle search submission
          className={styles.searchBox}
          contentBefore={<BowlSaladFilled />}
        />

        {/* Suggestions Dropdown */}
        {loading ? (
          <Spinner
            className={styles.spinner}
            size="tiny"
            label="Loading suggestions..."
          />
        ) : (
          suggestions.length > 0 && (
            <div className={styles.suggestionsList}>
              <List>
                {suggestions.map((dish) => (
                  <ListItem
                    key={dish.name}
                    className={styles.listItem}
                    onClick={() => handleSuggestionClick(dish.name)}
                  >
                    {dish.name} - {dish.ingredients}
                  </ListItem>
                ))}
              </List>
            </div>
          )
        )}
      </div>
      <div className={styles.profileSection}>
        {/* Conditionally render profile section if user is logged in */}

        {user ? (
          <Menu>
            <MenuTrigger>
              <Avatar
                className={styles.profileAvatar}
                color="brand"
                initials={getInitials(user.name)}
                name="user name avatar"
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        ) : (
          <Button appearance="secondary" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
