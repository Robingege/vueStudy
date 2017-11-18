<template>
    <main>
        <app-header></app-header>
        <app-home></app-home>
        <app-footer></app-footer>
    </main>
</template>

<script>
    import Home from "./home/home.vue";
        export default {
        components: {
            "app-home": Home
        }
    };
</script>

<style lang="less" scoped>
 
</style>

