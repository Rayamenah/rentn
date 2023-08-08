-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'user';
