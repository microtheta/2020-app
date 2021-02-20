-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "fid" TEXT,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.fid_unique" ON "users"("fid");
