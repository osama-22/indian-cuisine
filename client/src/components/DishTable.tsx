import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Link,
  Spinner,
  makeStyles,
  TableHeaderCell,
  Text,
  mergeClasses,
} from "@fluentui/react-components";
import axios from "axios";
import Pagination from "./Pagination";
import DishFilter from "./DishFilter";
import { ArrowUpRegular, ArrowDownRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  tableContainer: {
    margin: "2rem",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  sortableHeader: {
    cursor: "pointer",
    alignItems: "center",
  },
  table: {
    marginTop: "2rem",
  },
  textCentre: {
    textAlign: 'center'
  },
  heading: {
    marginBottom: '1rem'
  }
});

type DishProps = {
  name: string;
  ingredients: string;
  diet: string;
  course: string;
  cook_time: string;
  prep_time: string;
};

const DishTable: React.FC = () => {
  const [dishes, setDishes] = useState<DishProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [totalDishes, setTotalDishes] = useState(0); // Total number of dishes
  const [sortColumn, setSortColumn] = useState<keyof DishProps>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [filters, setFilters] = useState({
    diet: "",
    course: "",
    region: "",
    cook_time: { gte: "", lte: "" },
  });

  const styles = useStyles();

  // Fetch dishes
  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/dishes", {
          params: {
            page: currentPage,
            pageSize,
            diet: filters.diet,
            course: filters.course,
            region: filters.region,
            "cook_time[gte]": filters.cook_time.gte,
            "cook_time[lte]": filters.cook_time.lte,
          },
        });
        setDishes(response.data.dishes);
        setTotalDishes(response.data.total);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [currentPage, pageSize, filters]);

  // Handle pagination (passed to Pagination component)
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalDishes / pageSize);

  // Sorting logic
  const handleSort = (column: keyof DishProps) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }

    const sortedDishes = [...dishes].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
    });

    setDishes(sortedDishes);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={mergeClasses(styles.heading, styles.textCentre)}>
        <Text size={600} as="h2" block className={styles.textCentre}>
          Explore Our Delicious Dishes
        </Text>
        <Text as="h4" italic>
          Browse through a curated list of culinary delights and find your next
          favorite meal!
        </Text>
      </div>
      <DishFilter onFilterChange={setFilters} />

      {loading ? (
        <Spinner label="Loading dishes..." />
      ) : (
        <Table className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>S No.</TableHeaderCell>

              {/* Name column with sorting */}
              <TableHeaderCell
                className={styles.sortableHeader}
                onClick={() => handleSort("name")}
              >
                Name
                {sortColumn === "name" && (
                  <>
                    {sortDirection === "asc" ? (
                      <ArrowUpRegular fontSize={16} />
                    ) : (
                      <ArrowDownRegular fontSize={16} />
                    )}
                  </>
                )}
              </TableHeaderCell>

              <TableHeaderCell>Ingredients</TableHeaderCell>
              <TableHeaderCell>Diet</TableHeaderCell>
              <TableHeaderCell>Course</TableHeaderCell>
              <TableHeaderCell
                className={styles.sortableHeader}
                onClick={() => handleSort("cook_time")}
              >
                Cooking Time
                {sortColumn === "cook_time" && (
                  <>
                    {sortDirection === "asc" ? (
                      <ArrowUpRegular fontSize={16} />
                    ) : (
                      <ArrowDownRegular fontSize={16} />
                    )}
                  </>
                )}
              </TableHeaderCell>
              <TableHeaderCell
                className={styles.sortableHeader}
                onClick={() => handleSort("prep_time")}
              >
                Preparation Time
                {sortColumn === "prep_time" && (
                  <>
                    {sortDirection === "asc" ? (
                      <ArrowUpRegular fontSize={16} />
                    ) : (
                      <ArrowDownRegular fontSize={16} />
                    )}
                  </>
                )}
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {dishes.map((dish: DishProps, index) => (
              <TableRow key={index}>
                <TableCell>
                  {index + 1 + (currentPage - 1) * pageSize}
                </TableCell>
                <TableCell>
                  <Link href={`/dishes/${dish.name}`}>{dish.name}</Link>
                </TableCell>
                <TableCell>{dish.ingredients}</TableCell>
                <TableCell className={styles.capitalize}>{dish.diet}</TableCell>
                <TableCell className={styles.capitalize}>
                  {dish.course}
                </TableCell>
                <TableCell className={styles.capitalize}>
                  {dish.cook_time !== "-1" ? dish.cook_time : "N/A"}
                </TableCell>
                <TableCell className={styles.capitalize}>
                  {dish.prep_time !== "-1" ? dish.prep_time : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DishTable;
