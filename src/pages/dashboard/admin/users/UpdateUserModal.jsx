import React, { useState } from 'react';
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';


const UpdateUserModal = ({user, onClose, onRoleUpdate}) => {
	const [role, setRole] = useState(user.role);

	const [useUpdateUserRole] = useUpdateUserRoleMutation()
	const handeleUpdateRole = async () => {
			try {
				await useUpdateUserRole({userId: user?._id, role}).unwrap();
				alert("Rôle de l\'utilisateur modifier avec succès!");
				onRoleUpdate();
				onClose();
			} catch (error) {
				 console.error("Erreur lors de la modification du rôle de l'utilisateur", error);
			}

		}

    return (
<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center ">
          <div className="bg-white p-4 rounded shadow-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Modifier le rôle de l'utilisateur</h2>
            <hr className= 'my-2'/>
            	<div className= 'mb-4 space-y-4'>
            		<label className= 'block text-sm font-medium text-gray-700'>E-mail</label>
            		<input type= "email"
            		value={user?.email}
            		readOnly
            		className= 'mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
            		/>
            	</div>
            	<div className= 'mb-4 space-y-4'>
            		<label className= 'block text-sm font-medium text-gray-700'>Rôle</label>
            		<select 
            		value={role}
            		onChange={(e) => setRole(e.target.value)}
            		className= 'bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none'
            		>
								<option value='user'>User</option>
								<option value='manager'>Manager</option>
								<option value='admin'>Admin</option>
					      </select>
            	</div>
              <div className= 'flex justify-end pt-5'>
                  <button
		           onClick={onClose}
		           className="bg-primary text-white px-4 py-2 rounded mr-2"
		           >Fermer                   
                  </button>
                  <button
		           onClick={handeleUpdateRole}
		           className="bg-indigo-500 text-white px-4 py-2 rounded mr-2"
		           >Enregistrer                  
                  </button>
              </div>           
          </div>
        </div>
    )
}

export default UpdateUserModal;