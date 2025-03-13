import React from 'react';
import HeaderGuest from '../layouts/HeaderGuest';
import HeaderVolunteer from '../layouts/HeaderVolunteer';
import HeaderOrganization from '../layouts/HeaderOrganization';
import HeaderAdmin from '../layouts/HeaderAdmin';
import GetRole from '../utils/GetRole';
import { useAuthContext } from '../context/AuthContext';

const RoleHeader = () => {
    const { token } = useAuthContext();

    let role = GetRole(token);

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
