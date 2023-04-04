-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` DECIMAL(65, 30) NULL,
    `brandID` INTEGER NOT NULL,
    `category` VARCHAR(191) NULL,

    FULLTEXT INDEX `Product_description_idx`(`description`),
    FULLTEXT INDEX `Product_description_title_idx`(`description`, `title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandID_fkey` FOREIGN KEY (`brandID`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
