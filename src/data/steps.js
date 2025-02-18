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

const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-100';
const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-200';
const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
