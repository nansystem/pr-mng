<template>
  <div class="min-h-screen bg-blue-100 flex">
    <SideNav />

    <div class="flex-1 p-8">
      <h1 class="text-2xl font-bold mb-8">仕入先一覧</h1>
      <div class="max-w-4xl mx-auto space-y-8">
        <SupplierList class="bg-white rounded-lg shadow-lg p-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import SupplierList from '~/components/container/supplier/SupplierList.vue'
  import SideNav from '~/components/SideNav.vue'
</script>
