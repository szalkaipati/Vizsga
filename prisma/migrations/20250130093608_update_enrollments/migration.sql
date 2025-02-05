/*
  Warnings:

  - A unique constraint covering the columns `[course_id,email]` on the table `Enrollments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Enrollments_course_id_email_key` ON `Enrollments`(`course_id`, `email`);
