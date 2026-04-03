CREATE TABLE `cms_meta` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentType` enum('page','coverage','blog') NOT NULL,
	`slug` varchar(255) NOT NULL,
	`metaTitle` text,
	`metaDescription` text,
	`ogImage` text,
	`imageAltText` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cms_meta_id` PRIMARY KEY(`id`)
);
