
import { pgTable, serial, varchar, text, boolean } from "drizzle-orm/pg-core";

export const AIOutput=pgTable('aiOutput',{
    id: serial('id').primaryKey(),
    formData: varchar('formData').notNull(),
    aiResponse: text('aiResponse'),
    slug: varchar('slug').notNull(),
    createdBy: varchar('createdBy'),
    createdAt: varchar('createdAt'),
})


export const userSubscription = pgTable('userSubscription',{
    id: serial('id').primaryKey(),
    email: varchar('email'),
    userName: varchar('userName'),
    active:boolean('active'),
    paymentId:varchar('paymentId'),
    joinDate:varchar('joinDate')
})