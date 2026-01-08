import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';

dotenv.config();

const categories = [
  {
    name: 'Weight Management & Metabolic Support Peptides',
    description: 'Peptides designed to support weight management and metabolic health.',
  },
  {
    name: 'Regenerative, Repair & Anti-Aging Peptides',
    description: 'Peptides that promote tissue repair, regeneration, and anti-aging benefits.',
  },
  {
    name: 'Growth Hormone–Modulating Peptides',
    description: 'Peptides that help modulate growth hormone levels for optimal health.',
  },
  {
    name: 'Cognitive, Mood & Stress Support Peptides',
    description: 'Peptides designed to support cognitive function, mood, and stress management.',
  },
  {
    name: 'Skin, Beauty & Cosmetic Peptides',
    description: 'Peptides focused on skin health, beauty, and cosmetic applications.',
  },
  {
    name: 'Sexual Wellness Peptides',
    description: 'Peptides that support sexual wellness and hormonal balance.',
  },
  {
    name: 'Fat Burner Injectables (Not Peptides)',
    description: 'Injectable fat-burning solutions for metabolic support.',
  },
  {
    name: 'Hormones & Growth Factors (Not Peptides)',
    description: 'Hormones and growth factors for wellness and performance.',
  },
  {
    name: 'Vitamins, Cofactors & Others',
    description: 'Essential vitamins, cofactors, and other wellness supplements.',
  },
  {
    name: 'Injectable Pens',
    description: 'Convenient injectable pen devices for easy administration.',
  },
];

const seedCategories = async () => {
  try {
    await connectDB();

    // Clear existing categories (optional - remove if you want to keep existing data)
    // await Category.deleteMany({});

    // Check which categories already exist
    const existingCategories = await Category.find({});
    const existingNames = existingCategories.map(cat => cat.name);

    // Insert only new categories
    const categoriesToInsert = categories.filter(cat => !existingNames.includes(cat.name));

    if (categoriesToInsert.length > 0) {
      await Category.insertMany(categoriesToInsert);
      console.log(`✅ Seeded ${categoriesToInsert.length} new categories`);
    } else {
      console.log('✅ All categories already exist in the database');
    }

    // Display all categories
    const allCategories = await Category.find({});
    console.log(`\n📋 Total categories in database: ${allCategories.length}`);
    allCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
