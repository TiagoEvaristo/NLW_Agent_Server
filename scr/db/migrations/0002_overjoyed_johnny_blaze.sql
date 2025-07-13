CREATE TABLE "audio_chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_id" uuid NOT NULL,
	"trasncrioption" text NOT NULL,
	"embeddings" vector(768) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
