import React from 'react'; // Importation de React pour pouvoir utiliser JSX
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi';
import UserStats from './UserStats';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale, 
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Enregistre les composants de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDMain = () => {
    const { user } = useSelector((state) => state.auth); // Sélectionner l'utilisateur du store Redux
    const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email); // Requête avec l'email de l'utilisateur

    // Afficher l'objet user dans la console
   

    if (isLoading) return <div className="text-center text-gray-500">Chargement...</div>;
    if (!stats) {
        return <div className="text-center text-gray-500">Aucune donnée disponible</div>;
    }

    const data = {
        labels: ['Total Paiements', 'Total Avis', 'Total Produits Achetés'],
        datasets: [
            {
                label: 'Statistiques Utilisateur',
                data: [stats.totalPayments, stats.totalReviews, stats.totalPurchasedProducts],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Correction de 'postion' -> 'position'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {

                        return `${tooltipItem.label} : ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div className="p-6">
            <div>
                <h1 className="text-2xl font-semibold mb-4">Tableau de bord Utilisateur</h1>
                <p className="text-gray-500">
                    Bonjour, {user?.username}! Bienvenue dans votre tableau de bord utilisateur.
                </p>
            </div>
            <div className="mb-4">
                <UserStats stats={stats}/>
            </div>
            {/* Le conteneur du diagramme */}
            <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default UserDMain;

