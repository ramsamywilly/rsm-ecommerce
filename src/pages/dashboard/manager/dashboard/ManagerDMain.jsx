import React from 'react'; 
import { useSelector } from 'react-redux';
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi';
import ManagerStats from './ManagerStats';
import ManagerStatsChart from './ManagerStatsChart';

const ManagerDMain = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: stats, error, isLoading } = useGetAdminStatsQuery(user?.email); 


    if (isLoading) return <div className="text-center text-gray-500">Chargement...</div>;
    if(!stats) return <div className="text-center text-gray-500">Aucune statistiques disponible</div>;
    if (error) return <div className="text-center text-gray-500">Échec du chargement des statistiques</div>;

    return (
        <div className="p-6">
            <div>
                <h1 className="text-2xl font-semibold mb-4">Tableau de bord Manager</h1>
                <p className="text-gray-500">
                    Bonjour, {user?.username}! Bienvenue dans votre tableau de bord Manager.
                </p>
                <ManagerStats stats={stats}/>
                <ManagerStatsChart stats={stats}/>
            </div>
        </div>
    )
}

export default ManagerDMain;
