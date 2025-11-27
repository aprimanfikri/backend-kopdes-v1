CREATE TABLE "members" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" varchar(128) NOT NULL,
	"barcode" text NOT NULL,
	"photo" text NOT NULL,
	"card" text NOT NULL,
	"created_at" timestamp (6) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (6) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "members_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "members_id_version_unique" ON "members" USING btree ("id","version");