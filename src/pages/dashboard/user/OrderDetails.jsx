import React from 'react'; 
import { useGetOrdersByIdQuery } from '../../../redux/features/orders/orderApi';
import TimelineStep from '../../../components/TimelineStep';
import { useParams } from 'react-router-dom';


const OrderDetails = () => {
	const { orderId } = useParams();
	const { data: order, error, isLoading } = useGetOrdersByIdQuery(orderId);

	if(isLoading) return <div>Chargement...</div>
	if(error) return <div>Aucune commande</div>


const isCompleted = (status) => {
  const statuses = ["pending", "processing", "shipped", "completed"];
  return statuses.indexOf(status) < statuses.indexOf(order.status);
};

const isCurrent = (status) => order.status === status;
const statusTranslation = {
  pending: "En Attente",
  processing: "En cours de traitement",
  shipped: "Expédiée",
  completed: "Terminée",
  failed: "Échouée",
};
const steps = [
  {
    status: 'pending',
    label: 'En attente',
    description: 'Votre commande a été créée et est en attente de traitement.',
    icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
  },
  {
    status: 'processing',
    label: 'En cours de traitement',
    description: 'Votre commande est actuellement en cours de traitement.',
    icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
  },
  {
    status: 'shipped',
    label: 'Expédiée',
    description: 'Votre commande a été expédiée.',
    icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
  },
  {
    status: 'completed',
    label: 'Terminée',
    description: 'Votre commande a été complétée avec succès.',
    icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
  },
];


  return (
  <section className="section__container rounded p-6">
    <h2 className="text-2xl font-semibold mb-4">Paiement : {statusTranslation[order?.status] || "Statut inconnu"}</h2>
    <p className="mb-4">Identifiant de la commande : {order?.orderId}</p>
    <p className="mb-8">Statut : {statusTranslation[order?.status] || "Statut inconnu"}</p>

    <ul className="sm:flex items-center relative">
      {steps.map((step, index) => (
        <TimelineStep
          key={index}
          step={step}
          order={order}
          isCompleted={isCompleted(step.status)}
          isCurrent={isCurrent(step.status)}
          isLastStep={index === steps.length - 1}
          icon={step.icon}
          description={step.description}
        />
      ))}
    </ul>
  </section>
  );
}

export default OrderDetails;