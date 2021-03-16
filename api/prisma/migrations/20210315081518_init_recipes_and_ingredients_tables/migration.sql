/*
  Warnings:

  - The migration will change the primary key for the `Ingredient` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `Recipe` table. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_IngredientToRecipe` DROP FOREIGN KEY `_IngredientToRecipe_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_IngredientToRecipe` DROP FOREIGN KEY `_IngredientToRecipe_ibfk_2`;

-- AlterTable
ALTER TABLE `Ingredient` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Recipe` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_IngredientToRecipe` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `_IngredientToRecipe` ADD FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IngredientToRecipe` ADD FOREIGN KEY (`B`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
