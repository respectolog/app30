import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import "./Catalog.sass";
import { Search } from "./Search";
import lupa from "../lupa.png";

export function Catalog(props) {
  const dispatch = useDispatch();
  const categories = props.items;

  const [active_cat, changeActiveCat] = useState(categories[0]);

  const [active_link, setActiveLink] = useState(categories[0].id);

  const [s_word, changeWord] = useState("");

  function handleChange(event) {
    changeWord(event.target.value);
  }

  return (
    <>
      <div id="catalog">
        <div id="search">
          <img src={lupa} />
          <input type="search" placeholder="Поиск" onChange={handleChange} />
        </div>
        <Search word={s_word} cats={categories} />
        <div id="root-cats">
          <ul>
            {categories.map((item) => {
              if (item.id === active_link) {
                return (
                  <li
                    key={item.id}
                    className="active"
                    onClick={(event) => setActiveLink(item.id)}
                  >
                    <a onClick={(event) => changeActiveCat(item)}>
                      {item.title_ru}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li key={item.id} onClick={(event) => setActiveLink(item.id)}>
                    <a onClick={(event) => changeActiveCat(item)}>
                      {item.title_ru}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div id="sub-cats">
          <div>
            {active_cat.categories.map((item) => {
              return (
                <ul key={item.id}>
                  {item.title_ru}
                  {item.subcategories.map((sub) => {
                    return <li key={sub.id}>{sub.title_ru}</li>;
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
