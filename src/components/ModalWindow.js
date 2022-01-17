import React, { useState, useRef } from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import { Catalog } from './Catalog.js';

export function ModalWindow() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
      setIsModalVisible(true);
  };
  const handleCancel = () => {
      setIsModalVisible(false);
  };


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
      < Catalog/>

  </Modal>
  </>
);
}
