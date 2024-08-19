"use client"

import { Button, Divider } from 'antd';
import { useRouter } from 'next/navigation';

export default async function StartPage() {
  const router = useRouter();

  const buttonClick = () => {
    router.push('/shipment');
  };

  return (
    <div>
      <div>
        <img src="/logo.png" alt="Logo" style={{ width: "6rem" }} />
      </div>
      <Divider />
      <div style={{
        display: "block",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginRight: "50rem",
      }}>
        <h1><b>Envios</b></h1>
        <Divider />
        <p>Gerenciador de envios</p>
        <Divider />
        <div>
          <Button type="link" block onClick={buttonClick}>
            Gerenciar
          </Button>
        </div>
      </div>
    </div>
  );
}
