import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  // Helper to create user if not exists
  async function createUserIfNotExists(name: string, email: string, role: Role) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
      await prisma.user.create({
        data: { name, email, password, role },
      });
      console.log(`${role} created: ${email}`);
    } else {
      console.log(`${role} already exists: ${email}`);
    }
  }

  // Admin
  await prisma.user.deleteMany({ where: { email: "admin@example.com" } });
  await createUserIfNotExists("Admin", "admin@example.com", Role.ADMIN);

  // Teachers
  await createUserIfNotExists("Teacher1", "teacher1@example.com", Role.TEACHER);
  await createUserIfNotExists("Teacher2", "teacher2@example.com", Role.TEACHER);

  // Students
  await createUserIfNotExists("Student1", "student1@example.com", Role.STUDENT);
  await createUserIfNotExists("Student2", "student2@example.com", Role.STUDENT);

  console.log("Database seeding complete");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
