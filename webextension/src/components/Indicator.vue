<template>
    <div>
        <Card class="circle">
            <Badge place="count" :count="count" class-name="badge"></Badge>
        </Card>
    </div>

</template>

<script>
 export default {
   props: ['count']
 }
</script>

<style>
    @import './common/css/default.css';
</style>