export type Material = {
  id: string
  name: string
  unit_quantity: number
  unit_type: string
  price: number
  alias: string
  createdAt?: string
}
export type NewMaterial = Omit<Material, 'id' | 'createdAt'>
export type MaterialField = keyof Material
