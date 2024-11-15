import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CategoriesList.css";

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data); 
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ul className="categories-list">
      {categories.map(category => (
        <li key={category.id}>
          <NavLink to={`/categories/${category.id}/projects`}>
            {category.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default CategoriesList;
