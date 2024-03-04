export function checkUserRole(loggedUser, allowedRoles) {
    return loggedUser && loggedUser.roles.some(role => allowedRoles.includes(role.name));
}