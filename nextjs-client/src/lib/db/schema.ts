import { pgTable, serial, varchar, integer, real } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('User', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: integer('role').array(),
  scheme: integer('scheme').array(),
  region: integer('region').array(),
});

export const trips = pgTable('Trips', {
  id: serial('id').primaryKey(),
  tId: serial('t_id'),
  src: varchar('src', { length: 255 }).notNull(),
  dest: varchar('dest', { length: 255 }).notNull(),
  departureTime: varchar('departureTime', { length: 255 }).notNull(),
  arrivalTime: varchar('arrivalTime', { length: 255 }).notNull(),
  distance: real('distance').notNull(),
  fare: integer('fare').notNull(),
  adminApproval: integer('adminApproval').notNull(),
  supApproval: integer('supApproval').notNull(),
  dirApproval: integer('dirApproval').notNull(),
  employeeId: integer('employeeId').notNull(),
  scheme: integer('scheme').array(),
  region: integer('region').array(),
});

export const usersRelations = relations(users, ({ many }) => ({
  trips: many(trips),
}));

export const tripsRelations = relations(trips, ({ one }) => ({
  user: one(users, {
    fields: [trips.employeeId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Trip = typeof trips.$inferSelect;
export type NewTrip = typeof trips.$inferInsert; 