import store from "../store";

const AuthLayout = () => import('../layouts/AuthLayout.vue')
const AppLayout = () => import('../layouts/AppLayout.vue')


function privateRoute(to, from, next) {
    let isLogin = false;
    isLogin = !!store.state.auth.authenticated;
    if (isLogin) {
        next()
    } else {
        next('/login')
    }
}

function publicRoute(to, from, next) {
    let isLogin;
    isLogin = !!store.state.auth.authenticated;
    // debugger;
    if (isLogin) {
        next('/admin')
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'auth.login',
                component: () => import('../views/auth/Login.vue'),
                beforeEnter: publicRoute,
            },
            {
                path: '/login',
                redirect: {name: 'auth.login'}
            }
        ]
    },
    {
        path: '/',
        component: AppLayout,
        beforeEnter: privateRoute,
        children: [
            {
                name: 'admin.index',
                path: '/admin',
                component: () => import('../views/admin/index.vue'),
                meta: { breadCrumb: 'Admin' }
            },
            {
                name: 'profile.index',
                path: 'profile',
                component: () => import('../views/admin/profile/index.vue'),
                meta: { breadCrumb: 'Profile' }
            },
            {
                name: 'companies.index',
                path: 'companies',
                component: () => import('../views/admin/companies/index.vue'),
                meta: { breadCrumb: 'Companies' }
            },
            {
                name: 'companies.create',
                path: 'companies/create',
                component: () => import('../views/admin/companies/Create.vue'),
                meta: { breadCrumb: 'Add New' }
            },
            {
                name: 'companies.edit',
                path: 'companies/edit/:id',
                component: () => import('../views/admin/companies/Edit.vue'),
                meta: { breadCrumb: 'Company Edit' }
            },
            {
                name: 'employees.index',
                path: 'employees',
                component: () => import('../views/admin/employees/index.vue'),
                meta: { breadCrumb: 'Employees' }
            },
            {
                name: 'employees.create',
                path: 'employees/create',
                component: () => import('../views/admin/employees/Create.vue'),
                meta: { breadCrumb: 'Add New' }
            },
            {
                name: 'employees.edit',
                path: 'employees/edit/:id',
                component: () => import('../views/admin/employees/Edit.vue'),
                meta: { breadCrumb: 'Employee Edit' }
            },
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        component: () => import("../views/errors/NotFound.vue"),
    },
];

export default routes;
