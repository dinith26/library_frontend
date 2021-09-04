<template>
    <div class="container">
        <div class="card card-outline card-dark mt-5">
            <div class="card-header">
                <h3 class="card-title">Products {{VUE_APP_API_URL}}</h3>
                <router-link class="btn btn-primary btn-sm float-right" :to="{ path: '/book/new/'}" replace>Add New Book</router-link>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="text" v-model="search_title" v-on:keyup="searchByTitle" class="form-control" placeholder="Title">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="text" v-model="search_cat" v-on:keyup="searchByCategory" class="form-control" placeholder="Category">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="text" v-model="search_auth" v-on:keyup="searchByAuthor" class="form-control" placeholder="Author">
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Availability</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="book in list" v-bind:key="book.id">
                            <Record v-bind:book="book" />
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Record from './Record'
Vue.use(VueAxios, axios)

export default {
    name:'BookList',
    props: ['list'],
    components:{
        Record
    },
    data () {
        return {
            VUE_APP_API_URL: process.env.VUE_APP_API_URL,
            fresh_list: undefined,
            list: undefined,
            search_title: "",
            search_cat: "",
            search_auth: "",
            filter_list: undefined,
            filter_type: undefined,
            filter_param: undefined
        }
    },
    methods: {
        async getList() {
            Vue.axios.get(process.env.ROOT_API+'list')
            .then((res) => {
                this.list = res.data.data;
                this.fresh_list = res.data.data;
            })
        },

        // Search by Title was done by frontend filtering
        searchByTitle(){
            this.filter_list = this.fresh_list.filter(lst =>
                lst.title.toLowerCase().includes(this.search_title.toLowerCase())
            );
            this.list = this.filter_list;
        },

        searchByCategory(){
            this.filter_type = 'category';
            this.filter_param = this.search_cat;
            this.search();
        },

        searchByAuthor(){
            this.filter_type = 'author';
            this.filter_param = this.search_auth;
            this.search();
        },

        search(){
            if(this.filter_param == "" || this.filter_param == undefined){
                this.filter_param = 'all'
            }
            Vue.axios.get(process.env.ROOT_API+'search/'+this.filter_type+'/'+this.filter_param)
            .then((res) => {
                this.list = res.data.data;
                this.fresh_list = res.data.data;
            })
        }
    },
    mounted()
    {
        this.getList()
    },
}
</script>

<style>
    .table-bordered {
        border: 1px solid #dee2e6;
    }
    .table {
        width: 100%;
        margin-bottom: 1rem;
        color: #212529;
        background-color: transparent;
    }
    thead {
        display: table-header-group;
        vertical-align: middle;
        border-color: inherit;
    }
    tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }
    .table thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #dee2e6;
    }
    .table-bordered td, .table-bordered th {
        border: 1px solid #dee2e6;
    }
    .table th, .table td {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
    }
    tbody {
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit;
    }
    .table-striped tbody tr:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, 0.05);
    }
    .float-right{
        float: right;
        margin-top: -37px;
    }
</style>