-- CreateTable
CREATE TABLE "Store" (
    "store_id" TEXT NOT NULL,
    "shop_name" TEXT NOT NULL,
    "is_online" BOOLEAN NOT NULL,
    "scope" TEXT NOT NULL,
    "access_token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Story" (
    "story_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "story_name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "activated_at" TIMESTAMP(3),
    "deactivated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("story_id")
);

-- CreateTable
CREATE TABLE "Media" (
    "media_id" SERIAL NOT NULL,
    "story_id" INTEGER NOT NULL,
    "media_order" INTEGER NOT NULL,
    "media_url" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "product_handle" TEXT NOT NULL,
    "media_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_id_key" ON "Store"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_shop_name_key" ON "Store"("shop_name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_access_token_key" ON "Store"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_handle_key" ON "Product"("product_handle");
