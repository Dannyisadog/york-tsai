-- CreateTable
CREATE TABLE `Video` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `youtube_link` VARCHAR(191) NOT NULL,
    `cover_image` VARCHAR(191) NOT NULL,
    `video_type` ENUM('Commercial', 'MusicVideo', 'LiveSession', 'Concert', 'Highlight', 'ReelsAndShorts') NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VideoImage` (
    `id` VARCHAR(191) NOT NULL,
    `video_id` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VideoImage` ADD CONSTRAINT `VideoImage_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
