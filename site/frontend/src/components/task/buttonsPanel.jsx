import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import GetRole from "../../utils/GetRole";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import OrganizationButtonsPanel from "./buttonsPanel/OrganizationButtonsPanel";
import VolunteerNotRespondButtonsPanel from "./buttonsPanel/VolunteerNotRespondButtonsPanel";
import VolunteerCancelRespondButtonsPanel from "./buttonsPanel/VolunteerCancelRespondButtonsPanel";

function ButtonsPanel() {
    const { token } = useContext(AuthContext);
    let role = GetRole(token);
    console.log(role);
    return (
        <OrganizationButtonsPanel />
    );
}

export default ButtonsPanel;