-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "details" TEXT NOT NULL,
    "icon_type" TEXT NOT NULL DEFAULT 'email',
    "action_url" TEXT NOT NULL,
    "color_theme" TEXT NOT NULL DEFAULT 'primary',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);
