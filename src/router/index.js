import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BookList from '@/components/BookList'
import AddBook from '@/components/AddBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hellow',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/book/new',
      name: 'AddBook',
      component: AddBook
    },
    {
      path: '/book/edit/:id',
      name: 'EditBook',
      component: AddBook
    },
  ]
})
