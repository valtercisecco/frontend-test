import { Modal } from 'antd';
import { Shipment } from '@/types';

interface ShipmentDetailsModalProps {
    visible: boolean;
    onCancel: () => void;
    shipment?: Shipment;
}

const ShipmentDetailsModal: React.FC<ShipmentDetailsModalProps> = ({ visible, onCancel, shipment }) => {
    return (
        <Modal
            title={`Remessa ${shipment?.shipmentNumber}`}
            open={visible}
            onCancel={onCancel}
            footer={[]}
        >
            {shipment ? (
                <>
                    <p>Produtos</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem', marginTop: '1rem' }}>
                        {shipment.products.map((item) => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </Modal>
    );
};

export default ShipmentDetailsModal;
