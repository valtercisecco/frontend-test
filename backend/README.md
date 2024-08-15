# Documentção API

## Produtos ("/products")

### GET ("/products")

Retorna todos produtos cadastrados.

```bash
GET http://localhost:4000/products

Response: { id: string; name: string; }[]
```

---

## Envios ("/shipments")

### GET ("/shipments")

Retorna todos envios cadastrados.

```bash
GET http://localhost:4000/shipments

Response: {
  id: string;
  shipmentNumber: string;
  sendDate: Date;
  lastUpdate: Date;
  status: ShipmentStatus;
}[]
```

### GET ("/shipments/:id")

Retorna todos os dados do envio com o id informado.

```bash
GET http://localhost:4000/shipments/:id

Response: {
  id: string;
  shipmentNumber: string;
  sendDate: Date;
  lastUpdate: Date;
  status: ShipmentStatus;
  products: { id: string; name: string; }[]
}
```

### POST ("/shipments")

Cria um novo envio.

```bash
POST http://localhost:4000/shipments
{ body: { products: { id: string; name: string; }[] } }

Response: undefined | { error: string }
```
