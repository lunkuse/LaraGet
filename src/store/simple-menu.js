const state = () => {
    return {
        menu: [{
                icon: 'HomeIcon',
                pageName: 'side-menu-dashboard-overview',
                title: 'Home'
            },
            {
                icon: 'CalendarIcon',
                pageName: 'side-menu-appointments',
                title: 'Appointments'
            },
            {
                icon: 'MessageSquareIcon',
                pageName: 'side-menu-inquiry',
                title: 'Messages'
            },
            {
                icon: 'CreditCardIcon',
                pageName: 'side-menu-invoice',
                title: 'Invoices'
            },
            {
                icon: 'BellIcon',
                pageName: 'side-menu-notification',
                title: 'Notifications'
            },
            {
                icon: 'UserIcon',
                pageName: 'side-menu-profile-overview',
                title: 'Profile'
            },
            {
                icon: 'ToolIcon',
                pageName: 'side-menu-settings',
                title: 'Settings'
            }

        ]
    }
}

// getters
const getters = {
    menu: state => state.menu
}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}