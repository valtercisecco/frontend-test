"use client";

import { Button, Select, Space, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { findAllProducts } from "@/actions/product"; // Importe a função de actions dos produtos
import { Product } from "@/types"; // Importe o tipo Product

export default function StartPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products data when the component mounts
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
    console.log(`selected ${value}`);
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
        marginTop: "1rem",  // Ajuste a margem superior para separar do botão Voltar
      }}>
        {loading ? (
          <Spin tip="Carregando produtos..." />
        ) : (
          <Space style={{ width: '100%' }} align="center">
            <Select
              defaultValue={products[0]?.id || ''} // Defina um valor padrão se disponível
              style={{ width: "50rem" }}  // Ajuste a largura conforme necessário
              onChange={handleChange}
              options={products.map((product) => ({
                value: product.id,
                label: product.name,
              }))}
            />
            <Button type="primary">
              Adicionar
            </Button>
          </Space>
        )}
      </div>
    </div>
  );
}
