-- CreateTable
CREATE TABLE "leaders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "type" TEXT NOT NULL DEFAULT 'official',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "facebook_url" TEXT,
    "whatsapp_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leaders_pkey" PRIMARY KEY ("id")
);
