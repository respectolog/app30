import { useState } from "react";
import "./Catalog.sass";
import { Search } from "./Search";
import lupa from "../lupa.png";

export function Catalog(props) {
  const categories = props.items;
  const [activeCategory, changeActiveCategory] = useState(categories[0]);
  const [activeLink, setActiveLink] = useState(categories[0]?.id);
  const [searchWord, changeWord] = useState("");
  const close = props.funcClose;
  const setPath = props.funcSetPath;

  function handleChange(event) {
    changeWord(event.target.value);
  }
  const choiceCategory = (path) => {
    setPath(path);
    close();
  };

  return (
    <>
      <div className="catalog">
        <div className="catalog__search">
          <img src={lupa} alt="search" />
          <input type="search" placeholder="Поиск" onChange={handleChange} />
        </div>
        <Search
          word={searchWord}
          categories={categories}
          funcChoice={choiceCategory}
          funcClose={close}
        />
        <div className="catalog__root-categories">
          <ul className="catalog__root-categories-ul">
            {categories.map((item) => {
              return (
                <li
                  key={item.id}
                  className={item.id === activeLink ? "catalog__root-categories-li-active" : "catalog__root-categories-li"}
                  onClick={(event) => setActiveLink(item.id)}
                >
                  <a onClick={(event) => changeActiveCategory(item)} className="catalog__root-categories-a">
                    {item.title_ru}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="catalog__sub-categories">
          <div className="catalog__category-container">
            {activeCategory.categories.map((item) => {
              return (
                <div key={item.id} className="catalog__categories-block">
                  <ul className="catalog__ul">
                    {item.title_ru}
                    {item.subcategories.map((sub) => {
                      return (
                        <li key={sub.id} className="catalog__li">
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
          </div>
        </div>
      </div>
    </>
  );
}
