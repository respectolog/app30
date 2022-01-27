import React, { useState, useEffect } from "react";
import { Catalog } from "./Catalog.js";
import "./ModalWindow.sass";

export function ModalWindow() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [choicedCategory, setChoicedCategory] = useState([]);
  const setPath = (path) => {
    setChoicedCategory(path);
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(
      "https://merchant.dev.telcell.sale/api/v1/catalog/group/category/subcategory/tree?full=true"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        },

        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="container">
        <div className="category-path">
          {choicedCategory.map((item) => {
            return <span key={item.id}>{item.category}</span>;
          })}
        </div>
        <div className="modal-switch">
          <button onClick={showModal}>Каталог</button>
        </div>
        <div className={isModalVisible ? "back-grey" : "modal-hidden"}>
          <div className={isModalVisible ? "modal-visible" : "modal-hidden"}>
            <span onClick={handleCancel}>X</span>
            <Catalog
              items={items.data}
              funcClose={handleCancel}
              funcSetPath={setPath}
            />
          </div>
        </div>
      </div>
    );
  }
}
