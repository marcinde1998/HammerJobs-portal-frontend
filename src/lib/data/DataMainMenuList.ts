export const listMainMenu = [
    {
        label: 'Panel Administratora',
        roles: ['admin'],
        visible: true,
        destinationURL: '/adminpanel'
    },
    {
        label: 'Dodaj Dostawę',
        roles: ['admin', 'kierownik'],
        visible: true,
        destinationURL: '/deliveryadd'
    },
    {
        label: 'Lista Zamówień',
        roles: ['admin', 'kierownik', 'lider'],
        visible: true,
        destinationURL: '/deliverylist'
    },
    {
        label: 'Lista Komponentów',
        roles: ['admin', 'kierownik', 'lider', 'pracownik'],
        visible: true,
        destinationURL: '/componentlist'
    },
    {
        label: 'Magazyn',
        roles: ['admin', 'kierownik', 'lider', 'pracownik'],
        visible: true,
        destinationURL: '/warehousemanagement'
    }
]