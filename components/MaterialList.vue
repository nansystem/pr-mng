<template>
  <div class="space-y-4">
    <button
      class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      @click="isAddModalOpen = true"
    >
      材料を追加
    </button>

    <AddMaterialModal v-model="isAddModalOpen" />
    <!-- 削除確認モーダル -->
    <DeleteConfirmationModal
      v-model="isDeleteModalOpen"
      message="本当に削除しますか"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <MaterialTable
      :materials="materialsStore.materials"
      :editing-indexes="editingIndexes"
      :editing-materials="editingMaterials"
      @start-editing="startEditing"
      @save-edit="saveEdit"
      @remove-material="removeMaterial"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import MaterialTable from './MaterialTable.vue'
  import AddMaterialModal from './AddMaterialModal.vue'
  import DeleteConfirmationModal from './DeleteConfirmationModal.vue'
  import { useMaterialsStore } from '~/stores/materials'
  import type { Material } from '~/stores/materials'

  const isAddModalOpen = ref(false)
  const isDeleteModalOpen = ref(false)
  const deletingIndex = ref<number | null>(null)

  const materialsStore = useMaterialsStore()
  const editingIndexes = ref<number[]>([])
  const editingMaterials = ref<Material[]>([])

  // 初期データ取得
  materialsStore.fetchMaterials()

  // 編集関連関数
  const startEditing = (index: number) => {
    editingIndexes.value.push(index)
    editingMaterials.value[index] = { ...materialsStore.materials[index] }
  }

  const saveEdit = (index: number) => {
    const material = editingMaterials.value[index]
    if (material.id) {
      materialsStore.updateMaterial(material.id, material)
      editingIndexes.value = editingIndexes.value.filter(i => i !== index)
    }
  }

  const removeMaterial = (index: number) => {
    deletingIndex.value = index
    isDeleteModalOpen.value = true
  }

  const confirmDelete = () => {
    if (deletingIndex.value !== null) {
      const material = materialsStore.materials[deletingIndex.value]
      if (material.id) {
        materialsStore.removeMaterial(material.id)
      }
      deletingIndex.value = null
      isDeleteModalOpen.value = false
    }
  }

  const cancelDelete = () => {
    deletingIndex.value = null
    isDeleteModalOpen.value = false
  }
</script>
