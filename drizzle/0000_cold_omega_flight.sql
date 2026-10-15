CREATE TABLE `inquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`topic` text NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`status` text DEFAULT '신규' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
