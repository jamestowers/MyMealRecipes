-- CreateTable
CREATE TABLE `Recipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000),
    `isChildFriendly` BOOLEAN,
    `isVeggie` BOOLEAN,
    `cookingTime` INTEGER,
    `difficulty` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` ENUM('VEG', 'FRUIT', 'MEAT', 'DAIRY', 'EGG', 'CHEESE', 'CEREAL', 'SUGAR', 'HERB', 'SPICE', 'CONDIMENT', 'OIL', 'FAT') NOT NULL,
    `type` ENUM('VEG_SALAD', 'VEG_ROOT', 'MEAT_BEEF', 'MEAT_LAMB', 'MEAT_PORK', 'MEAT_POULTRY', 'MEAT_FISH', 'NUT', 'PASTA', 'RICE'),
UNIQUE INDEX `Ingredient.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_IngredientToRecipe` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
UNIQUE INDEX `_IngredientToRecipe_AB_unique`(`A`, `B`),
INDEX `_IngredientToRecipe_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_IngredientToRecipe` ADD FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IngredientToRecipe` ADD FOREIGN KEY (`B`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
