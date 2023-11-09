-- CreateTable
CREATE TABLE "Store" (
    "store_id" SERIAL NOT NULL,
    "shop_name" TEXT NOT NULL,
    "is_online" BOOLEAN NOT NULL,
    "scope" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "Story" (
    "story_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "story_name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "activated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("story_id")
);

-- CreateTable
CREATE TABLE "Media" (
    "media_id" SERIAL NOT NULL,
    "story_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
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
