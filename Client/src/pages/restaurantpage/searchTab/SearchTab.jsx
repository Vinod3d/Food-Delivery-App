/* eslint-disable react/prop-types */
import { useState } from 'react'
import styles from './search.module.css'

const categories = [
  { id: 1, name: 'Offers', active: true },
  { id: 2, name: 'Burgers' },
  { id: 3, name: 'Fries' },
  { id: 4, name: 'Snacks' },
  { id: 5, name: 'Salads' },
  { id: 6, name: 'Cold drinks' },
  { id: 7, name: 'Happy Meal*' },
  { id: 8, name: 'Desserts' },
  { id: 9, name: 'Hot drinks' },
  { id: 10, name: 'Sauces' },
  { id: 11, name: 'Orbit*' }
]

export default function SearchTab({search, setQuerySearch}) {
  const [activeCategory, setActiveCategory] = useState(1);
  const [query, setQuery] = useState("");

  if(query.length > 0){
    setQuerySearch(true)
  } else{
    setQuerySearch(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && query.trim() !== "") {
      search(query);
    }
  };

  return (
    <nav>
      <div className={styles.header}>
        <h1 className={styles.title}>All Offers from McDonald&apos;s East London</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search from menu..."
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} 
            
          />
        </div>
      </div>
      <div className={styles.navStrip}>
        <ul className={styles.navList}>
          {categories.map((category) => (
            <li
              key={category.id}
              className={`${styles.navItem} ${
                category.id === activeCategory ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

