// ROLE_ADMIN, ROLE_USER, ROLE_TEST, ROLE_DEVELOPER
import helper from 'helper';
export const basedMenu = [
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
                title: 'List Order',
                path: '/orders',
                role: ['ROLE_ADMIN', 'ROLE_DEVELOPER']
            },
            {
                title: 'List User',
                path: '/users',
                role: ['ROLE_ADMIN', 'ROLE_DEVELOPER', 'ROLE_TEST']
            },
            {
                title: 'List Card',
                path: '/cards'
            }
        ]
    },
    {
        title: 'Private',
        icon: 'profile',
        path: '/private',
        children: [
            {
                title: 'Private Orders',
                path: '/orders',
                role: ['ROLE_ADMIN', 'ROLE_DEVELOPER']
            },
            {
                title: 'Private List',
                path: '/users',
                role: ['ROLE_ADMIN', 'ROLE_TEST']
            }
        ]
    },
    {
        title: 'Account',
        icon: 'user',
        path: '/account'
    }
];

const menuTree = applyMenuRole(helper.cloneDeep(basedMenu));
const basedUserRoles = ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_TEST', 'ROLE_DEVELOPER'];
const hasInRoles = userRoles => userRoles.every(r => basedUserRoles.includes(r));
const checkIsSuperUser = userRoles => userRoles.includes(basedUserRoles[0]);

export function createFlattenMenu() {
    const output = [];
    function loop(data, parent) {
        data.forEach(item => {
            output.push(item);
            if (parent) {
                item.path = parent.path + item.path;
            }
            if (item.children) {
                loop(item.children, item);
                delete item.children;
            }
        });
    }
    loop(helper.cloneDeep(basedMenu));
    return output;
}
export function applyMenuRole(menu) {
    function loop(data, parent) {
        data.forEach(item => {
            if (parent) {
                parent.role = parent.role || [];
                item.path = parent.path + item.path;
                if (item.role) {
                    parent.role = [...new Set(parent.role.concat(item.role))];
                }
            }
            if (item.children) {
                loop(item.children, item);
            }
        });
    }
    loop(menu);
    return menu;
}

function createUserMenuByUserRole(menu, role) {
    function loop(data) {
        data.forEach((item, index) => {
            if (item.children) loop(item.children);
            if (item.role) {
                const roleInmenu = item.role.some(t => role.includes(t));
                if (!roleInmenu) {
                    data.splice(index, 1);
                }
            }
        });
    }
    loop(menu);
    return menu;
}
export function createUserMenu(role) {
    const userRoles = helper.isArray(role) ? role : [role];
    const inRoles = hasInRoles(userRoles);
    if (inRoles) {
        const isSuperUser = checkIsSuperUser(userRoles);
        if (isSuperUser) return basedMenu;
        return createUserMenuByUserRole(menuTree, role);
    }
    return [];
}
