/*
  Warnings:

  - You are about to drop the column `document_id` on the `Submissions` table. All the data in the column will be lost.
  - You are about to drop the `Document_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Documents` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Submissions` DROP COLUMN `document_id`;

-- DropTable
DROP TABLE `Document_files`;

-- DropTable
DROP TABLE `Documents`;

-- CreateTable
CREATE TABLE `Files` (
    `file_id` VARCHAR(191) NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `submissionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submissions`(`submission_id`) ON DELETE CASCADE ON UPDATE CASCADE;
