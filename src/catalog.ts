/**
 * Catalog module for browsing and filtering fitness products.
 *
 * Provides a searchable product catalog with filtering by category,
 * price range, and availability.
 */

/** A product available in the catalog. */
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  tags: string[];
  description: string;
}

/** Filter criteria for catalog searches. */
export interface CatalogFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  tags?: string[];
}

/** Searchable product catalog with filtering and sorting. */
export class ProductCatalog {
  private products: Map<string, Product> = new Map();

  /**
   * Add a product to the catalog.
   * @param product - The product to add.
   * @throws Error if a product with the same ID already exists.
   */
  addProduct(product: Product): void {
    if (this.products.has(product.id)) {
      throw new Error(`Product '${product.id}' already exists in catalog`);
    }
    this.products.set(product.id, product);
  }

  /**
   * Search products by name or description (case-insensitive).
   * @param query - The search string.
   * @returns Array of matching products.
   */
  search(query: string): Product[] {
    const q = query.toLowerCase();
    return [...this.products.values()].filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  /**
   * Filter products by structured criteria.
   * @param filter - The filter criteria to apply.
   * @returns Array of products matching all specified criteria.
   */
  filter(filter: CatalogFilter): Product[] {
    let results = [...this.products.values()];

    if (filter.category !== undefined) {
      results = results.filter((p) => p.category === filter.category);
    }
    if (filter.minPrice !== undefined) {
      results = results.filter((p) => p.price >= filter.minPrice!);
    }
    if (filter.maxPrice !== undefined) {
      results = results.filter((p) => p.price <= filter.maxPrice!);
    }
    if (filter.available !== undefined) {
      results = results.filter((p) => p.available === filter.available);
    }
    if (filter.tags !== undefined && filter.tags.length > 0) {
      results = results.filter((p) =>
        filter.tags!.some((t) => p.tags.includes(t))
      );
    }

    return results;
  }

  /**
   * Get a product by its ID.
   * @throws Error if not found.
   */
  getProduct(id: string): Product {
    const product = this.products.get(id);
    if (!product) {
      throw new Error(`Product '${id}' not found`);
    }
    return product;
  }

  /** Total number of products in the catalog. */
  get size(): number {
    return this.products.size;
  }

  /** Return all unique categories in the catalog. */
  get categories(): string[] {
    const cats = new Set([...this.products.values()].map((p) => p.category));
    return [...cats].sort();
  }
}
