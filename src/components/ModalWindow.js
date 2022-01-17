import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import { Catalog } from "./Catalog.js";

export function ModalWindow() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
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
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal} className="cat_button">
        Каталог
      </Button>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1280}
        footer={null}
      >
        <Catalog items={items.data} />
      </Modal>
    </>
  );
}
