import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  // Admin
  await prisma.user.create({
    data: { name: "Admin", email: "admin@example.com", password, role: Role.ADMIN }
  });

  // Teachers
  await prisma.user.create({
    data: { name: "Teacher1", email: "teacher1@example.com", password, role: Role.TEACHER }
  });
  await prisma.user.create({
    data: { name: "Teacher2", email: "teacher2@example.com", password, role: Role.TEACHER }
  });

  // Students
  await prisma.user.create({
    data: { name: "Student1", email: "student1@example.com", password, role: Role.STUDENT }
  });
  await prisma.user.create({
    data: { name: "Student2", email: "student2@example.com", password, role: Role.STUDENT }
  });

  console.log("Database seeded successfully");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
