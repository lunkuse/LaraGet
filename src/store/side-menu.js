const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'side-menu-dashboard-overview',
        title: 'Dashboard'
      },
      {
        icon: 'CalendarIcon',
        pageName: 'side-menu-view-products',
        title: 'Products'
      },

      {
        icon: 'CalendarIcon',
        pageName: 'side-menu-view-orders',
        title: 'Orders'
      },

      // {
      //   icon: 'MessageSquareIcon',
      //   pageName: 'side-menu-communication',
      //   title: 'Communication'
      // },
      {
        icon: 'CreditCardIcon',
        pageName: 'side-menu-invoice',
        title: 'Invoice'
      },
      // {
      //     icon: 'BellIcon',
      //     pageName: 'side-menu-notification',
      //     title: 'Notifications'
      // },
      {
        icon: 'UserIcon',
        pageName: 'side-menu-profile-overview',
        title: 'Profile'
      },
 
    
      {
        icon: 'ChevronLeftIcon',
        pageName: 'side-menu-logout',
        title: 'Logout'
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
