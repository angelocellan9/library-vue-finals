import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import CategoryView from "../views/CategoryView.vue";
import TransactionView from "../views/TransactionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/products",
      name: "Products",
      component: ProductsView,
    },
    {
      path: "/category",
      name: "Category",
      component: CategoryView,
    },
    {
      path: "/transaction",
      name: "Transaction",
      component: TransactionView,
    },
  ],
});

export default router;
