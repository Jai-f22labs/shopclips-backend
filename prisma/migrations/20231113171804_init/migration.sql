-- CreateTable
CREATE TABLE "Store" (
    "store_id" TEXT NOT NULL,
    "shop_name" TEXT NOT NULL,
    "is_online" BOOLEAN,
    "scope" TEXT,
    "access_token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Story" (
    "story_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "story_name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "path" TEXT NOT NULL DEFAULT '/*',
    "status" TEXT NOT NULL DEFAULT 'active',
    "activated_at" TIMESTAMP(3),
    "deactivated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Media" (
    "media_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "media_order" INTEGER NOT NULL,
    "media_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "product_handle" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "product_order" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_id_key" ON "Store"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_shop_name_key" ON "Store"("shop_name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_access_token_key" ON "Store"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Story_story_id_key" ON "Story"("story_id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_media_id_key" ON "Media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_id_key" ON "Product"("product_id");
