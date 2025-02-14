/*
  Warnings:

  - You are about to alter the column `course_id` on the `Assignments` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Assignments` MODIFY `course_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Assignments` ADD CONSTRAINT `Assignments_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Courses`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;
