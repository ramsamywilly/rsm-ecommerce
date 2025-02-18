import React, { useEffect, useState, useMemo } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useGetAdminStatsQuery, useGetMonthlyProductSalesQuery } from '../../../../redux/features/stats/statsApi';

const AdminStatsChart = React.memo(() => {
  const { data: stats, error: statsError } = useGetAdminStatsQuery();
  const { data: monthlyProductSales, error: productSalesError } = useGetMonthlyProductSalesQuery();

  const [productSalesData, setProductSalesData] = useState(new Array(12).fill(0));

  // Vérification des erreurs d'API
  if (statsError) {
    return <div>Error loading stats</div>;
  }
  if (productSalesError) {
    return <div>Error loading product sales</div>;
  }

  useEffect(() => {
    if (monthlyProductSales) {
      const salesData = new Array(12).fill(0);  // Réinitialisation des données
      monthlyProductSales.forEach((entry) => {
        // Assurez-vous que le nom de la propriété correspond à ce qui est renvoyé par le backend
        salesData[entry.month - 1] = entry.totalSales; // Remplacer "sales" par "totalSales"
      });
      setProductSalesData(salesData);  // Mise à jour de l'état
    }
  }, [monthlyProductSales]);

  // Données pour le graphique circulaire
  const pieData = useMemo(() => ({
    labels: ['Total Commande', 'Total Produits', 'Total Avis', 'Total Utilisateurs'],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          stats?.totalOrders,
          stats?.totalProducts,
          stats?.totalReviews,
          stats?.totalUsers
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2E8',
          '#FFCE56',
          '#48C0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2E8',
          '#FFCE56',
          '#48C0C0',
          '#9966FF'
        ],
      }
    ]
  }), [stats]); // Recalcule les données uniquement si stats change.

  // Données pour les gains mensuels
  const lineData = useMemo(() => {
    const data = new Array(12).fill(0);
    stats?.monthlyEarnings?.forEach((entry) => {
      data[entry.month - 1] = entry.earnings;
    });

    return {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      datasets: [
        {
          label: 'Gains mensuels',
          data,
          fill: false,
          backgroundColor: '#36A2E8',
          borderColor: '#36A2E8',
          tension: 0.1
        },
      ]
    };
  }, [stats]); // Recalcule les données uniquement si stats change.

  // Données pour les produits vendus par mois
  const productSalesLineData = useMemo(() => ({
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    datasets: [
      {
        label: 'Produits Vendus par Mois',
        data: productSalesData,
        fill: false,
        backgroundColor: '#FFCE56', // Couleur différente
        borderColor: '#FFCE56',
        tension: 0.1
      },
    ]
  }), [productSalesData]); // Recalcule les données uniquement si productSalesData change.

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          textAlign: 'start',
          padding: 15,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' unités';
          }
        }
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-12 space-y-12">
      <h2 className="text-xl font-semibold mb-4">Aperçus des statistiques d’administration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Graphique circulaire */}
        <div className="max-h-96 md:h-96 w-full">
          <Pie data={pieData} options={options} />
        </div>
        {/* Graphique des gains mensuels */}
        <div className="max-h-96 md:h-96 w-full">
          <Line data={lineData} options={options} />
        </div>
      </div>
      {/* Nouveau graphique des produits vendus */}
      <div className="w-full max-h-96 mt-12">
        <Line data={productSalesLineData} options={options} />
      </div>
      <div className="text-center text-sm text-blueGray-500 font-semibold py-1">
        Réalisé avec <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> par <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
      </div>
    </div>
  );
});

export default AdminStatsChart;



