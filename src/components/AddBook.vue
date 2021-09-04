<template>
    <div class="container">
        <div class="card card-outline card-dark mt-5">
            <div class="card-header">
                <h3 class="card-title">{{form_title}}</h3>
                <router-link class="btn btn-primary btn-sm float-right" :to="{ path: '/'}" replace>Book List</router-link>
            </div>
            <div class="card-body">
                <form @submit="addBook">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errors.length">
                        <p>
                            <b>Please correct the following error(s):</b>
                            <ul>
                            <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="isbm">ISBN</label>
                                <input type="text" v-model="isbn" class="form-control" placeholder="ISBN">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input type="text" v-model="title" class="form-control" placeholder="Title">
                            </div>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="category">Category</label>
                                <input type="text" v-model="category" class="form-control" placeholder="Category">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="author">Author</label>
                                <input type="text" v-model="author" class="form-control" placeholder="Author">
                            </div>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="price">Price</label>
                                <input type="text" v-model="price" class="form-control" placeholder="Price">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="availability">Availability</label>
                                <input type="text" v-model="availability" class="form-control" placeholder="Availability">
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-4">
                        <button class="btn btn-success">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    Vue.use(VueAxios, axios)

    export default {
        name: 'AddBook',
        data(){
            return {
                errors: [],
                isEdit: false,
                isbn: "",
                title:"",
                category:"",
                author:"",
                price:"",
                availability:"",
                form_title:"Add Book"
            }
        },
        methods: {
            async getData() {
                try{
                    Vue.axios.get(process.env.ROOT_API+'record/'+this.$route.params.id)
                    .then((res) => {
                        this.isbn = res.data.data.isbn;
                        this.title = res.data.data.title;
                        this.availability = res.data.data.availability;
                        this.category = res.data.data.category;
                        this.price = res.data.data.price;
                        this.author = res.data.data.author;
                    })
                } catch(err){
                    console.log(err)
                }
            },

            addBook(e) {
                this.errors = [];

                if (!this.isbn) {
                    this.errors.push('ISBN required.');
                }
                if (!this.title) {
                    this.errors.push('Title required.');
                }
                if (!this.availability) {
                    this.errors.push('Availability required.');
                }
                if (!this.category) {
                    this.errors.push('Category required.');
                }
                if (!this.price) {
                    this.errors.push('Price required.');
                }
                if (!this.author) {
                    this.errors.push('Author required.');
                }
                e.preventDefault()

                const newBook = {
                    isbn:this.isbn,
                    title:this.title,
                    category:this.category,
                    author:this.author,
                    price:this.price,
                    availability:this.availability,
                }

                if(this.isEdit){

                   this.updateBook(newBook)
                }else{
                    this.saveBook(newBook)
                }
            },

            saveBook(bookObj){
                axios.post(process.env.ROOT_API+'create', bookObj)
                .then((res) => {
                    this.$router.push('/');
                }).catch(error=>{
                    let arr = [];
                    Object.keys(error.response.data.errors).map(function(key, index) {
                        arr.push(error.response.data.errors[key][index])
                    });
                    this.errors = arr;
                });
            },

            updateBook(bookObj){
                axios.put(process.env.ROOT_API+'update/'+this.$route.params.id, bookObj)
                .then((res) => {
                    console.log(res)
                    this.$router.push('/');
                });
            }
        },
        created(){
            this.isEdit = false;
            if(this.$route.params && this.$route.params.id){
                this.form_title = "Update Book"
                this.getData();
                this.isEdit = true;
            }
        }
    }
</script>
<style>
    .float-right{
        float: right;
        margin-top: -37px;
    }
</style>