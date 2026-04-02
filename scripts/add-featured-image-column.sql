-- Add featured_image column to blog_posts
-- Run this in Supabase SQL Editor
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;

-- Set the image for the brief guide post
UPDATE blog_posts
SET featured_image = '/blog/how-to-write-shopify-agency-brief.png'
WHERE slug = 'how-to-write-shopify-agency-brief';
