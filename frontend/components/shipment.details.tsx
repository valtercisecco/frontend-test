import { Modal, Button } from 'antd';
import { Shipment } from '@/types';

interface ShipmentDetailsModalProps {
    visible: boolean;
    onCancel: () => void;
    shipment?: Shipment;
}

const ShipmentDetailsModal: React.FC<ShipmentDetailsModalProps> = ({ visible, onCancel, shipment }) => {
    return (
        <Modal
            title={`Remessa ${shipment?.shipmentNumber}`} // Exibe o número da remessa no título
            open={visible}
            onCancel={onCancel}
            footer={[]}
        >
            {shipment ? (
                <>
                    <p><strong>Produtos:</strong></p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                        {shipment.products.map((item) => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Carregando detalhes do envio...</p>
            )}
        </Modal>
    );
};

export default ShipmentDetailsModal;
