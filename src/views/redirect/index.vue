<template></template>
<script lang="ts" setup>
    import {
        useRouter
    } from 'vue-router';
    const router = useRouter()
    const {
        path,
        query
    } = router.currentRoute.value
    router.replace({
        path: path.replace("/redirect", ""),
        query
    })
</script>