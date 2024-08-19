"use client"

// Imports
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

    // Effect hook to fetch shipment data on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await findAllShipments(); 
                setShipments(data); // Update state with fetched shipments
            } catch (error) {
                console.error("Error fetching shipments:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Function to handle showing shipment details in a modal
    const handleShowDetails = async (id: string) => {
        try {
            const shipment = await findShipmentById(id); 
            setSelectedShipment(shipment); 
            setModalVisible(true); // Show the modal
        } catch (error) {
            console.error("Error fetching shipment details:", error);
        }
    };

    // Function to handle closing the modal
    const handleCancel = () => {
        setModalVisible(false); // Hide the modal
        setSelectedShipment(undefined); // Clear selected shipment
    };

    // Columns for Ant Design Table
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
                visible={modalVisible} // Show or hide modal
                onCancel={handleCancel}
                shipment={selectedShipment}
            />
        </div>
    );
}
