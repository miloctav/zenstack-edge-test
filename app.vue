  <template>
  <div>
    <h1>Test Items</h1>
    <div v-if="items">
      <div v-for="item in items" :key="item.id">
        {{ item.name }}
      </div>
    </div>
    <button @click="createItem">Create Test Item</button>
  </div>
</template>

<script setup>
import { useFindManyTestItem, useCreateTestItem } from '~/lib/hooks'

const { data: items, refetch } = useFindManyTestItem()
const { mutateAsync: createTestItem } = useCreateTestItem()

async function createItem() {
  try {
    await createTestItem({
      data: {
        name: 'Test ' + Date.now()
      }
    })
    refetch()
  } catch (error) {
    console.error('Error creating item:', error)
  }
}
</script>