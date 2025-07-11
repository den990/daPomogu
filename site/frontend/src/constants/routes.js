const ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    LOGIN: "/login",
    TASK: "/task/:taskId",
    PHOTO_REPORT: "/task/:taskId/photo-report",
    CONFIRMATIONS_RESPONSES: "/task/:taskId/confirmations-responses",
    CONFIRMATIONS_TASKS: "/task/:taskId/confirmations-tasks",
    ACCOUNT_VOLUNTEER: "/account-volunteer",
    ACCOUNT_ORGANIZATION: "/account-organization",
    TASKS_CATALOG: "/tasks-catalog",
    ADMIN_PANEL: "/admin-panel",
    REGISTER_VOLUNTEER: "/registration-volunteer",
    CREATE_TASK: "/create-task",
    REGISTER_ORGANIZATION: "/registration-organization",
    CHAT: "/chat",
    ATTACHMENTS_ORGANIZATION: "/attachments-to-organization",
    ADMIN_DASHBOARD: "/admin-dashboard",
    EDIT_VOLUNTEER_PROFILE: "/edit-volunteer-profile",
    ADMIN_EDIT_ORGANIZATION: "/admin-edit-organization",
    EDIT_ORGANIZATION_PROFILE: "/edit-organization-profile",
    ERROR: "/error",
    ADMIN_REGISTER_ORGANIZATION: "/admin-registrate-organization",
    EDIT_PASSWORD: "/edit-password",
    MY_TASKS: "/my-tasks",
    PUBLIC_ACCOUNT_VOLUNTEER: "/account-volunteer/:volonteerId",
    PUBLIC_ACCOUNT_ORGANIZATION: "/account-organization/:organizationId",
    ORGANIZATION_TASKS: "/organization-tasks",
    STATISTIC: "/organization-statistic",
    CALENDAR: "/my-calendar",
    EDIT_TASK: "/edit-task/:taskId",

    LIST_ORGANIZATION: "/organizations",
    LIST_USERS_IN_ORGANIZATION: "/users-in-organization",
    TEST_AUTH: "/test-auth",
};

export default ROUTES;
