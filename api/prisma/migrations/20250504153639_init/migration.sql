-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
