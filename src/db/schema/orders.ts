import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { campaigns } from './campaigns';

export const orders = pgTable('orders', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  campaign_id: uuid('campaign_id').notNull().references(() => campaigns.id, { onDelete: 'cascade' }),
  parent_name: varchar('parent_name', { length: 255 }).notNull(),
  parent_whatsapp: varchar('parent_whatsapp', { length: 50 }).notNull(),
  child_name: varchar('child_name', { length: 255 }).notNull(),
  child_nickname: varchar('child_nickname', { length: 100 }),
  child_age: integer('child_age').notNull(),
  style: varchar('style', { length: 100 }).notNull().default('emocionante'),
  dream_gift: text('dream_gift').notNull(),
  achievement: text('achievement').notNull(),
  family_signature: varchar('family_signature', { length: 255 }),
  custom_notes: text('custom_notes'),
  price_paid: integer('price_paid').notNull(), // Centavos (ex: 3000 = R$ 30,00)
  batch_tier: integer('batch_tier').notNull(), // 1, 2, 3 ou 4
  generated_script: text('generated_script'),
  veo3_prompt: text('veo3_prompt'),
  status: varchar('status', { length: 50 }).notNull().default('aguardando_confirmacao'),
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
