<template>
    <div class="table-tr">
        <td>{{book.isbn}}</td>
        <td>{{book.title}}</td>
        <td>{{book.price}}</td>
        <td>{{book.author}}</td>
        <td>{{book.category}}</td>
        <td>{{book.availability}}</td>
        <td><router-link class="btn btn-sm btn-warning" :to="{ path: '/book/edit/'+book.id}" replace>Update</router-link></td>
    </div>
</template>

<script>
    export default {
        name: "Record",
        props: ['book']
    }
</script>
<style>
    .table-tr{
        display:contents;
    }
</style>