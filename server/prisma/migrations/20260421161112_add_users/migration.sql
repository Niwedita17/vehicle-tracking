-- CreateTable
CREATE TABLE "User" (
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("phone")
);
