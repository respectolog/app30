import React from "react";

import { useState, useEffect } from "react";
import "./Catalog.sass";
import { Search } from "./Search";
import lupa from "../lupa.png";

export function Catalog(props) {
  const categories = props.items;
  const [activeCategory, changeActiveCategory] = useState(categories[0]);
  const [activeLink, setActiveLink] = useState(categories[0]?.id);
  const [searchWord, changeWord] = useState("");
  const [choicedCategory, setChoicedCategory] = useState("");
  const close = props.funcClose;
  const setPath = props.funcSetPath;

  function handleChange(event) {
    changeWord(event.target.value);
  }
  function choiceCategory(path) {
    setPath(path);
    close();
  }

  return (
    <>
      <div className="catalog">
        <div className="search">
          <img src={lupa} />
          <input type="search" placeholder="Поиск" onChange={handleChange} />
        </div>
        <Search word={searchWord} categories={categories} />
        <div className="root-categories">
          <ul>
            {categories.map((item) => {
              return (
                <li
                  key={item.id}
                  className={item.id === activeLink ? "active" : ""}
                  onClick={(event) => setActiveLink(item.id)}
                >
                  <a onClick={(event) => changeActiveCategory(item)}>
                    {item.title_ru}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sub-categories">
          <>
            {activeCategory.categories.map((item) => {
              return (
                <div key={item.id} className="categories-block">
                  <ul>
                    {item.title_ru}
                    {item.subcategories.map((sub) => {
                      return (
                        <li key={sub.id}>
                          <a
                            onClick={() =>
                              choiceCategory([
                                {
                                  category: activeCategory.title_ru,
                                  id: activeCategory.id,
                                },
                                { category: item.title_ru, id: item.id },
                                { category: sub.title_ru, id: sub.id },
                              ])
                            }
                          >
                            {sub.title_ru}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </>
        </div>
      </div>
    </>
  );
}
