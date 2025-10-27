-- CreateTable
CREATE TABLE IF NOT EXISTS "admin_settings" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "admin_settings_key_key" ON "admin_settings"("key");

-- Insert default admin password
INSERT INTO "admin_settings" ("key", "value", "updated_at")
VALUES ('admin_password', 'pass', CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;
