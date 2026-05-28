-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `githubId` INTEGER NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `bio` TEXT NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `htmlUrl` VARCHAR(191) NULL,
    `followers` VARCHAR(191) NULL DEFAULT '0',
    `following` VARCHAR(191) NULL DEFAULT '0',
    `publicRepos` VARCHAR(191) NULL,
    `githubCreatedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profiles_githubId_key`(`githubId`),
    UNIQUE INDEX `profiles_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repositories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `githubRepoId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `language` VARCHAR(191) NULL,
    `stars` INTEGER NOT NULL DEFAULT 0,
    `forks` INTEGER NOT NULL DEFAULT 0,
    `watchers` INTEGER NOT NULL DEFAULT 0,
    `htmlUrl` VARCHAR(191) NULL,
    `fork` BOOLEAN NOT NULL DEFAULT false,
    `visibility` VARCHAR(191) NULL,
    `pushedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `repositories_githubRepoId_key`(`githubRepoId`),
    INDEX `repositories_profileId_idx`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile_analytics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalStars` INTEGER NOT NULL DEFAULT 0,
    `totalForks` INTEGER NOT NULL DEFAULT 0,
    `mostUsedLanguage` VARCHAR(191) NULL,
    `topRepository` VARCHAR(191) NULL,
    `developerScore` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `profile_analytics_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `repositories` ADD CONSTRAINT `repositories_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile_analytics` ADD CONSTRAINT `profile_analytics_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
