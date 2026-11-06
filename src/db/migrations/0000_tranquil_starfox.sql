CREATE TABLE IF NOT EXISTS "campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(100) NOT NULL,
	"title" varchar(255) NOT NULL,
	"character_name" varchar(100) DEFAULT 'Papai Noel' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "campaigns_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" uuid NOT NULL,
	"parent_name" varchar(255) NOT NULL,
	"parent_whatsapp" varchar(50) NOT NULL,
	"child_name" varchar(255) NOT NULL,
	"child_nickname" varchar(100),
	"child_age" integer NOT NULL,
	"style" varchar(100) DEFAULT 'emocionante' NOT NULL,
	"dream_gift" text NOT NULL,
	"achievement" text NOT NULL,
	"family_signature" varchar(255),
	"custom_notes" text,
	"price_paid" integer NOT NULL,
	"batch_tier" integer NOT NULL,
	"generated_script" text,
	"veo3_prompt" text,
	"status" varchar(50) DEFAULT 'aguardando_confirmacao' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
