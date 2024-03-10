export const listMainMenu = [
    {
        label: 'Panel Administratora',
        roles: ['admin'],
        visible: true,
        destinationURL: '/adminpanel'
    },
    {
        label: 'Dodaj Dostawę',
        roles: ['admin', 'manager'],
        visible: true,
        destinationURL: '/deliveryadd'
    },
    {
        label: 'Lista Dostaw',
        roles: ['admin', 'manager', 'leader'],
        visible: true,
        destinationURL: '/deliverylist'
    },
    {
        label: 'Lista Komponentów',
        roles: ['admin', 'manager', 'leader', 'employee'],
        visible: true,
        destinationURL: '/componentlist'
    },
    {
        label: 'Magazyn',
        roles: ['admin', 'manager', 'leader', 'employee'],
        visible: false,
        destinationURL: '/warehousemanagement'
    }
]