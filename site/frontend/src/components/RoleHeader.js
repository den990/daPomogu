import React from 'react';
import HeaderGuest from '../layouts/HeaderGuest';
import HeaderVolunteer from '../layouts/HeaderVolunteer';
import HeaderOrganization from '../layouts/HeaderOrganization';
import HeaderAdmin from '../layouts/HeaderAdmin';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../context/AuthContext';

const RoleHeader = () => {
    const { token } = useAuthContext();
    let role = null;

    if (token) {
        try {
          const decoded = jwtDecode(token);
          role = decoded.role;
        } catch (error) {
          console.error("Ошибка при декодировании токена:", error);
        }
    }

    switch (role) {
    case 'admin':
        return <HeaderAdmin />;
    case 'organization':
        return <HeaderOrganization />;
    case 'volunteer':
        return <HeaderVolunteer />;
    default:
        return <HeaderGuest />;
    }
};

export default RoleHeader;
