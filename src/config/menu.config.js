export const menu = [
    {
        title: 'Dashboard',
        icon: 'dashboard',
        path: '/'
    },
    {
        title: 'List',
        icon: 'table',
        path: '/list',
        children: [
            {
                title: 'Order List',
                path: '/orders'
            },
            {
                title: 'User List',
                path: '/users'
            },
            {
                title: 'Card List',
                path: '/cards'
            }
        ]
    },
    {
        title: 'Account',
        icon: 'user',
        path: '/account'
    }
];
