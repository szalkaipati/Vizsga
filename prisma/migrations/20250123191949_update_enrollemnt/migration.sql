/*
  Warnings:

  - You are about to drop the column `user_id` on the `Enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `Users` table. All the data in the column will be lost.
  - Added the required column `email` to the `Enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Enrollments` DROP FOREIGN KEY `Enrollments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_role_id_fkey`;

-- DropIndex
DROP INDEX `Enrollments_user_id_fkey` ON `Enrollments`;

-- DropIndex
DROP INDEX `Users_role_id_fkey` ON `Users`;

-- AlterTable
ALTER TABLE `Enrollments` DROP COLUMN `user_id`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `role_id`,
    ADD COLUMN `roleId` INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollments` ADD CONSTRAINT `Enrollments_email_fkey` FOREIGN KEY (`email`) REFERENCES `Users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
