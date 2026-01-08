# Database Schema Documentation

## Overview

The PowerMed backend uses MongoDB with two main collections: **Categories** and **Products**.

---

## Category Entity

### Purpose
Stores product categories that products can be organized under. There are initially 10 categories in the system.

### Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | String | ✅ Yes | Category name (unique) |
| `slug` | String | Auto-generated | URL-friendly version of name (auto-generated from name) |
| `description` | String | No | Category description |
| `image` | String | No | Cloudinary URL for category image |
| `isActive` | Boolean | No | Whether category is active (default: true) |
| `createdAt` | Date | Auto | Timestamp when created |
| `updatedAt` | Date | Auto | Timestamp when last updated |

### Example
```javascript
{
  _id: ObjectId("..."),
  name: "Weight Management & Metabolic Support Peptides",
  slug: "weight-management-metabolic-support-peptides",
  description: "Peptides designed to support weight management and metabolic health.",
  image: "https://res.cloudinary.com/.../image.jpg",
  isActive: true,
  createdAt: 2024-01-01T00:00:00.000Z,
  updatedAt: 2024-01-01T00:00:00.000Z
}
```

### Initial Categories (10)
1. Weight Management & Metabolic Support Peptides
2. Regenerative, Repair & Anti-Aging Peptides
3. Growth Hormone–Modulating Peptides
4. Cognitive, Mood & Stress Support Peptides
5. Skin, Beauty & Cosmetic Peptides
6. Sexual Wellness Peptides
7. Fat Burner Injectables (Not Peptides)
8. Hormones & Growth Factors (Not Peptides)
9. Vitamins, Cofactors & Others
10. Injectable Pens

---

## Product Entity

### Purpose
Stores individual products that belong to a category. Products can be managed with full CRUD operations.

### Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | String | ✅ Yes | Product name/title |
| `brand` | String | No | Product brand (default: "PowerMed") |
| `price` | Number | ✅ Yes | Product price (must be positive) |
| `category` | ObjectId | ✅ Yes | Reference to Category (required) |
| `image` | String | ✅ Yes | Cloudinary URL for product image |
| `categoryType` | String | No | Type/subcategory (e.g., "GLP-1 analog", "Peptide blend") |
| `description` | String | No | Product description |
| `stock` | Number | No | Available stock quantity (default: 0) |
| `isActive` | Boolean | No | Whether product is active (default: true) |
| `createdAt` | Date | Auto | Timestamp when created |
| `updatedAt` | Date | Auto | Timestamp when last updated |

### Example
```javascript
{
  _id: ObjectId("..."),
  name: "Semaglutide",
  brand: "PowerMed",
  price: 2775.00,
  category: ObjectId("category_id_here"),
  image: "https://res.cloudinary.com/.../product.jpg",
  categoryType: "GLP-1 analog",
  description: "Supports appetite management and healthy lifestyle goals.",
  stock: 50,
  isActive: true,
  createdAt: 2024-01-01T00:00:00.000Z,
  updatedAt: 2024-01-01T00:00:00.000Z
}
```

### Important Fields
- **name**: Product title/name
- **price**: Product price (required)
- **category**: Reference to Category collection (required)
- **image**: Cloudinary URL (required, uploaded via API)

### Additional Fields
- **brand**: Product brand name
- **categoryType**: Subcategory or type classification
- **description**: Detailed product description
- **stock**: Inventory count

---

## Relationships

### Category → Products (One-to-Many)
- One category can have many products
- Products reference categories via `category` field (ObjectId)
- When querying products, category details are populated using `.populate('category')`

---

## CRUD Operations

### Categories
- ✅ **Create**: `POST /api/categories`
- ✅ **Read**: `GET /api/categories` (all) or `GET /api/categories/:id` (single)
- ✅ **Update**: `PUT /api/categories/:id`
- ✅ **Delete**: `DELETE /api/categories/:id` (soft delete)

### Products
- ✅ **Create**: `POST /api/products` (with image upload)
- ✅ **Read**: `GET /api/products` (all, with filters) or `GET /api/products/:id` (single)
- ✅ **Update**: `PUT /api/products/:id` (with optional image upload)
- ✅ **Delete**: `DELETE /api/products/:id` (soft delete)

---

## Image Storage

- All images are stored on **Cloudinary**
- Product images are required
- Category images are optional
- Images are automatically optimized and resized (max 800x800px)
- Maximum file size: 5MB
- Supported formats: JPG, JPEG, PNG, WEBP

---

## Indexes

### Product Collection
- Index on `category` and `isActive` for faster category-based queries
- Text index on `name` and `description` for search functionality

---

## Soft Delete

Both Categories and Products use **soft delete**:
- Instead of removing from database, `isActive` is set to `false`
- This preserves data integrity and allows for recovery
- Default queries filter by `isActive: true` to show only active items
