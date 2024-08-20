"use client";

import { Button, Select, Space, Spin, List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { findAllProducts } from "@/actions/product";
import { createShipment } from "@/actions/shipment";
import { Product } from "@/types";

export default function ProductPage() {
  const router = useRouter();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);
  const [creatingShipment, setCreatingShipment] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await findAllProducts();
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts(); 
  }, []);

  const buttonClick = () => {
    router.push('/shipment');
  };

  const handleChange = (value: string) => {
    setSelectedProductId(value);
  };

  const handleAddProduct = () => {
    if (selectedProductId) {
      const product = products.find(p => p.id === selectedProductId); 
      if (product && !addedProducts.some(p => p.id === product.id)) {
        setAddedProducts(prev => [...prev, product]);
      }
      setSelectedProductId(undefined);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setAddedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleCreateShipment = async () => {
    if (addedProducts.length === 0) return;
    
    setCreatingShipment(true);
    try {
      const shipmentData = { products: addedProducts.map(p => p.id) };
      await createShipment(shipmentData);
      message.success("Envio criado com sucesso!");
      setAddedProducts([]);
    } catch (error) {
      console.error("Error creating shipment:", error); 
      message.error("Erro ao criar envio."); 
    } finally {
      setCreatingShipment(false);
    }
  };

  return (
    <div>
      <div>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={buttonClick}>
          Voltar
        </Button>
      </div>
      <div style={{
        padding: "16px",
        marginTop: "1rem",
      }}>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <Space style={{ width: '100%' }} align="center">
            <Select
              value={selectedProductId}
              style={{ width: "70rem" }}
              onChange={handleChange}
              options={products.map((product) => ({
                value: product.id,
                label: product.name,
              }))}
            />
            <Button type="primary" onClick={handleAddProduct} disabled={!selectedProductId}>
              Adicionar
            </Button>
          </Space>
        )}
        <div style={{ marginTop: "1rem" }}>
          <List
            dataSource={addedProducts}
            renderItem={(item) => (
              <List.Item style={{ border: 'none', padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                {item.name}
                <Button danger onClick={() => handleRemoveProduct(item.id)}>
                  Remover
                </Button>
              </List.Item>
            )}
          />
          <Button
            type="primary"
            onClick={handleCreateShipment}
            disabled={addedProducts.length === 0 || creatingShipment}
            loading={creatingShipment}
            style={{ marginTop: "1rem", marginLeft: "70rem" }}
          >
            Criar envio
          </Button>
        </div>
      </div>
    </div>
  );
}
