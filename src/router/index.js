import { createRouter, createWebHistory } from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import SimpleMenu from '../layouts/simple-menu/Main.vue'
import TopMenu from '../layouts/top-menu/Main.vue'
import DashboardOverview from '../views/dashboard/Main.vue'
import Inquiry from '../views/chat/Main.vue'
import Communication from '../views/communications/Communication.vue'
import ProfileOverview from '../views/profile-overview/Main.vue'
import Login from '../views/login/Main.vue'
import VerifyPhone from '../views/login/verify_phone.vue'
import VerifyEmail from '../views/login/verify_email.vue'
import Register from '../views/register/Main.vue'
import Reset from '../views/change-password/Reset.vue'
import Invoice from '../views/invoices/Invoice.vue'
// import Notification from '../views/notifications/Notification.vue'
import Settings from '../views/settings/Settings.vue'
import Appointments from '../views/appointments/Appointments.vue'
import AppointmentsDetails from '../views/appointments/AppointmentDetails.vue'
import Questions from '../views/appointments/appointments/answer_dental_questions.vue'
import ViewAppointments from '../views/appointments/ViewAppointments.vue'
import ViewRecalls from '/src/views/appointments/ViewRecalls.vue'
import CompletedAppointments from '../views/appointments/CompletedAppointments.vue'
import InvoiceDetails from '../views/invoices/SingleInvoice.vue'
import SingleTransaction from '../views/invoices/SingleTransaction.vue'
import Calendar from '../views/calendar/Calendar.vue'
import AppointmentTypes from '../views/appointmenttypes/AppointmentType.vue'



import ComposeEmail from '../views/communications/ComposeEmail.vue'
import Draft from '../views/communications/Draft.vue'
import OpenEmail from '../views/communications/OpenEmail.vue'
import SentMail from '../views/communications/SentMails.vue'
import OpenSentEmail from '../views/communications/OpenSentMails.vue'

import ErrorPage from '../views/error-page/Main.vue'
import UpdateProfile from '../views/update-profile/Main.vue'
import ChangePassword from '../views/change-password/Main.vue'
import Logout from '../views/change-password/Logout.vue'
import RegularTable from '../views/regular-table/Main.vue'
import PaymentSuccessPage from '../views/invoices/SuccessPayment.vue'

import AuthService from '../service/auth-service'
// import { useI18n } from 'vue-i18n'
const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/dashboard',
    component: SideMenu,
    children: [
      {
        path: '/dashboard',
        name: 'side-menu-dashboard-overview',
        component: DashboardOverview,
        meta: {
          crumbs: [{ name: 'Dashboard', link: '' }]
        }
      },

      {
        path: 'communication',
        name: 'side-menu-communication',
        component: Communication,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Communication', link: '' }
          ]
        }
      },
      {
        path: 'inquiry',
        name: 'side-menu-inquiry',
        component: Inquiry,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Messages', link: '' }
          ]
        }
      },

      {
        path: 'profile',
        name: 'side-menu-profile-overview',
        component: ProfileOverview,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Profile', link: '' }
          ]
        }
      },
      {
        path: 'invoice',
        name: 'side-menu-invoice',
        component: Invoice,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Invoice', link: '' }
          ]
        }
      },
      {
        path: 'settings',
        name: 'side-menu-settings',
        component: Settings,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Settings', link: '' }
          ]
        }
      },
      
      {
        path: 'appointments',
        name: 'side-menu-appointments',
        component: Appointments,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Appointments', link: '' },
          
          ]
        }
      },
      {
        path: 'recalls',
        name: 'appointment-view-Reacall',
        component: ViewRecalls,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'View Recalls', link: '' }
          ]
        }
      },

      {
        path: 'viewappointments',
        name: 'side-menu-view-appointments',
        component: ViewAppointments,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'View Appointments', link: '' }
          ]
        }
      },
      
      {
        path: 'completedappointments',
        name: 'side-menu-completed-appointments',
        component: CompletedAppointments,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Appointments', link: '' }
          ]
        }
      },

      {
        path: 'calendar',
        name: 'side-menu-calendar',
        component: Calendar,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Calendar', link: '' }
          ]
        }
      },
    
  

      {
        path: 'successful-payment',
        name: 'side-menu-successful-payment',
        component: PaymentSuccessPage,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Payment', link: '' }
          ]
        }
      },

      {
        path: 'compose-email',
        name: 'side-menu-compose-email',
        component: ComposeEmail,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Compose Email', link: '' }
          ]
        }
      },
      {
        path: 'draft-email',
        name: 'side-menu-draft-email',
        component: Draft,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Draft', link: '' }
          ]
        }
      },
      {
        path: 'sent-email',
        name: 'side-menu-sent-email',
        component: SentMail,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Sent Emails', link: '' }
          ]
        }
      },

      {
        path: '/side-menu/open-email/:newmessageID',
        name: 'side-menu-open-email',
        component: OpenEmail,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Emails', link: '/dashboard/communication' },
            { name: 'Email Details', link: '' }
          ]
        }
      },
      {
        path: 'open-sent-email/:newmessageID',
        name: 'side-menu-open-sent-email',
        component: OpenSentEmail,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Sent Emails', link: '/dashboard/sent-email' },
            { name: 'Email Details', link: '' }
          ]
        }
      },

      {
        path: 'appointmenttypes',
        name: 'side-menu-appointmenttypes',
        component: AppointmentTypes,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Appointment Types', link: '' }
          ]
        }
      },

      {
        path: 'chat',
        name: 'side-menu-view-chat',
        component: Inquiry,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Chat', link: '' }
          ]
        }
      },

      {
        path: 'appointment-details/:appointmentId',
        name: 'side-menu-appointment-details',
        component: AppointmentsDetails,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Appointments', link: '/dashboard/viewappointments' },
            { name: 'Details', link: '' }
          ]
        }
      },

      {
        path: 'side-menu-dentalquestions/:appointmentId/:patientId',
        name: 'side-menu-dentalquestions',
        component: Questions,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Appointments', link: '/dashboard/viewappointments' },
            { name: 'Anamnese Questions', link: '' }
          ]
        }
      },

      {
        path: 'invoice-details/:invoiceId',
        name: 'side-menu-invoice-details',
        component: InvoiceDetails,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Invoices', link: '/dashboard/invoice' },
            { name: 'Invoice Details', link: '' }
          ]
        }
      },
      
     
     

     
      {
        path: 'transaction-details/:invoiceId/:transactionId',
        name: 'side-menu-transaction-details',
        component: SingleTransaction,
        meta: {
          crumbs: [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Transaction Details', link: '' }
          ]
        }
      },

      // {
      //     path: 'notification',
      //     name: 'side-menu-notification',
      //     component: Notification,
      //     meta: {
      //         crumbs: [
      //             { name: 'Home', link: '/dashboard' },
      //             { name: 'Notification', link: '' }
      //         ]
      //     }
      // },
      {
        path: 'update-profile',
        name: 'side-menu-update-profile',
        component: UpdateProfile,
        meta: {
          crumbs: [{ name: 'Update Profile', link: '' }]
        }
      },
      {
        path: 'change-password',
        name: 'side-menu-change-password',
        component: ChangePassword
      },
      {
        path: 'logout',
        name: 'side-menu-logout',
        component: Logout
      },

      {
        path: 'regular-table',
        name: 'side-menu-regular-table',
        component: RegularTable
      }
    ]
  },
  {
    path: '/simple-menu',
    component: SimpleMenu,
    children: [
      {
        path: '/',
        name: 'simple-menu-dashboard-overview',
        component: DashboardOverview
      },

      {
        path: 'inquiry',
        name: 'simple-menu-inquiry',
        component: Inquiry
      },
      {
        path: 'profile-overview',
        name: 'simple-menu-profile-overview',
        component: ProfileOverview
      },
      {
        path: 'update-profile',
        name: 'simple-menu-update-profile',
        component: UpdateProfile
      },
      {
        path: 'invoice',
        name: 'invoice',
        component: Invoice
      },
      {
        path: 'change-password',
        name: 'simple-menu-change-password',
        component: ChangePassword
      },
      {
        path: 'regular-table',
        name: 'simple-menu-regular-table',
        component: RegularTable
      }
    ]
  },
  {
    path: '/top-menu',
    component: TopMenu,
    children: [
      {
        path: '/',
        name: 'top-menu-dashboard-overview',
        component: DashboardOverview
      },

      {
        path: 'inquiry',
        name: 'top-menu-inquiry',
        component: Inquiry
      },
      {
        path: 'profile-overview',
        name: 'top-menu-profile-overview',
        component: ProfileOverview
      },
      {
        path: 'update-profile',
        name: 'top-menu-update-profile',
        component: UpdateProfile
      },
      {
        path: 'invoice',
        name: 'invoice',
        component: Invoice
      },

      {
        path: 'change-password',
        name: 'top-menu-change-password',
        component: ChangePassword
      },
      {
        path: 'regular-table',
        name: 'top-menu-regular-table',
        component: RegularTable
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/verifyphone',
    name: 'verifyphone',
    component: VerifyPhone
  },
  {
    path: '/verifyemail',
    name: 'verifyemail',
    component: VerifyEmail
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset
  },

  {
    path: '/error-page',
    name: 'error-page',
    component: ErrorPage
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const publicPages = [
    '/login',
    '/register',
    '/error-page',
    '/contact',
    '/reset'
  ]
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = JSON.parse(localStorage.getItem('user'))
  const expiry = localStorage.getItem('expires_in')
  // localStorage.removeItem('expires_in')
  // localStorage.removeItem('expiryDate')

  const now = Date.now() / 1000
  const check = now < expiry
  console.log('start of route', check, now, expiry)
  if (loggedIn && Object.prototype.hasOwnProperty.call(loggedIn, 'expiry')) {
    // check of token expired.
    console.log(loggedIn.expiry)
    if (new Date(loggedIn.expiry) < new Date()) {
      AuthService.deleteToken()
      next('/login')
    }
  }
  // trying to access a restricted page + not logged in
  // redirect to login page
  next(authRequired && !loggedIn ? '/login' : null)
})

export default router
