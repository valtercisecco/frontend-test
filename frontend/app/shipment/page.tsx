"use client"

import { Button, Table } from 'antd';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { findAllShipments, findShipmentById } from '@/actions/shipment';
import { Shipment, ShipmentStatus } from '@/types';
import ShipmentDetailsModal from '@/components/shipment.details';

export default function ShipmentPage() {
    const router = useRouter();
    
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState<Shipment | undefined>(undefined);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await findAllShipments(); 
                setShipments(data);
            } catch (error) {
                console.error("Error fetching shipments:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleShowDetails = async (id: string) => {
        try {
            const shipment = await findShipmentById(id); 
            setSelectedShipment(shipment); 
            setModalVisible(true);
        } catch (error) {
            console.error("Error fetching shipment details:", error);
        }
    };

    const handleCancel = () => {
        setModalVisible(false); 
        setSelectedShipment(undefined);
    };

    const columns = [
        {
            title: "Número da remessa",
            dataIndex: "shipmentNumber",
            key: "shipmentNumber",
        },
        {
            title: "Data de envio",
            dataIndex: "sendDate",
            key: "sendDate",
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Última atualização",
            dataIndex: "lastUpdate",
            key: "lastUpdate",
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: ShipmentStatus) => status,
        },
        {
            title: "Ações",
            dataIndex: "id",
            key: "actions",
            render: (id: string) => (
                <Button type='primary' onClick={() => handleShowDetails(id)}>Ver detalhes</Button>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => router.push('/product')}>
                Criar envio
            </Button>
            <div style={{ marginTop: "1rem" }}>
                <Table
                    dataSource={shipments.map((shipment) => ({
                        shipmentNumber: shipment.shipmentNumber,
                        sendDate: shipment.sendDate,
                        lastUpdate: shipment.lastUpdate,
                        status: shipment.status,
                        id: shipment.id,
                    }))}
                    columns={columns}
                    loading={loading}
                />
            </div>
            <ShipmentDetailsModal
                visible={modalVisible}
                onCancel={handleCancel}
                shipment={selectedShipment}
            />
        </div>
    );
}
