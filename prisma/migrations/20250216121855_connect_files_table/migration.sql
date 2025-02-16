/*
  Warnings:

  - You are about to drop the column `course_id` on the `Course_materials` table. All the data in the column will be lost.
  - You are about to drop the column `document_id` on the `Course_materials` table. All the data in the column will be lost.
  - You are about to drop the column `document_id` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Course_materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignmentId` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coursematerialId` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course_materials` DROP COLUMN `course_id`,
    DROP COLUMN `document_id`,
    ADD COLUMN `courseId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Courses` DROP COLUMN `document_id`;

-- AlterTable
ALTER TABLE `Files` ADD COLUMN `assignmentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `coursematerialId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Course_materials` ADD CONSTRAINT `Course_materials_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `Assignments`(`assingment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_coursematerialId_fkey` FOREIGN KEY (`coursematerialId`) REFERENCES `Course_materials`(`material_id`) ON DELETE CASCADE ON UPDATE CASCADE;
