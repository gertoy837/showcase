/*
  Warnings:

  - You are about to drop the column `descripsi` on the `makanan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `makanan` DROP COLUMN `descripsi`,
    ADD COLUMN `deskripsi` TEXT NULL;
