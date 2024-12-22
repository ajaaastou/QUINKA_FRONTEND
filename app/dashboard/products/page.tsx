"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
import { getProducts } from "@/actions/product"
import { getCategories } from "@/actions/category"
import { getSuppliers } from "@/actions/supplier"
import { useEffect, useState } from "react"
import type { Product } from "@/actions/product"
import type { Category } from "@/actions/category"
import type { Supplier } from "@/actions/supplier"

interface EnrichedProduct extends Omit<Product, 'category_id' | 'supplier_id'> {
  category: string;
  supplier: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<EnrichedProduct[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const [productsRes, categoriesRes, suppliersRes] = await Promise.all([
          getProducts(),
          getCategories(),
          getSuppliers()
        ]);

        console.log("Products response:", productsRes);
        console.log("Categories response:", categoriesRes);
        console.log("Suppliers response:", suppliersRes);

        if (productsRes.success && productsRes.data && categoriesRes.success && categoriesRes.data && suppliersRes.success && suppliersRes.data) {
          const categoriesMap = new Map(categoriesRes.data.map(cat => [cat.id, cat.name]));
          const suppliersMap = new Map(suppliersRes.data.map(sup => [sup.id, sup.name]));

          const enrichedProducts = productsRes.data.map((product: Product) => ({
            ...product,
            category: categoriesMap.get(product.category_id) || 'Catégorie inconnue',
            supplier: suppliersMap.get(product.supplier_id) || 'Fournisseur inconnu',
          }));

          setProducts(enrichedProducts);
        } else {
          console.error("Erreur:", productsRes.error || categoriesRes.error || suppliersRes.error)
          setProducts([])
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
        setProducts([])
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  )
}
