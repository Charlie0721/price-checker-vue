import Vue from 'vue'
import VueRouter from 'vue-router'
import ChequeadorP from '../views/chequeadoPrecios.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ChequeadorP',
    component: ChequeadorP,
  },
 
]

const router = new VueRouter({
  routes
})

export default router
