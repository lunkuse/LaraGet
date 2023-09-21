const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'top-menu-dashboard',
        title: 'Dashboard',
        subMenu: [
          {
            icon: '',
            pageName: 'top-menu-dashboard-overview',
            title: 'Overview '
          }
        ]
      },
      {
        icon: 'EditIcon',
        pageName: 'top-menu-registration-progress',
        title: 'Registration Progress'
      },
      {
        icon: 'CreditCardIcon',
        pageName: 'top-menu-loan-applications',
        title: 'Loan Applications'
      },
      {
        icon: 'FileTextIcon',
        pageName: 'top-menu-documentation',
        title: 'Documentation'
      },
      {
        icon: 'MessageSquareIcon',
        pageName: 'top-menu-inquiry',
        title: 'Inquiry'
      },
      {
        icon: 'FileTextIcon',
        pageName: 'top-menu-support',
        title: 'Support'
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
