import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  int,
  text,
  bigint,
} from "drizzle-orm/mysql-core";
import { object } from "zod";

export const roles = mysqlTable("roles", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const staff = mysqlTable("staff", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  surname: text("surname").notNull(),
  telNo: text("tel_no").notNull(),
  roleId: bigint("role_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => roles.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const prename = mysqlTable("pre_name", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const faculty = mysqlTable("faculty", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  telNo: text("tel_no").notNull(),
});

export const department = mysqlTable("department", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  telNo: text("tel_no").notNull(),
  facultyId: bigint("faculty_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => faculty.id),
});

export const researcher = mysqlTable("researcher", {
  id: serial("id").primaryKey(),
  prenameId: bigint("pre_name_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => prename.id),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  departmentId: bigint("department_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => department.id),
  telNo: text("tel_no").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at").defaultNow().notNull(),
});

export const committeePosition = mysqlTable("committee_position", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const committee = mysqlTable("committee", {
  id: serial("id").primaryKey(),
  prenameId: bigint("pre_name_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => prename.id),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  positionId: bigint("position_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => committeePosition.id),
  description: text("description").notNull(),
  telNo: text("tel_no").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at").defaultNow().notNull(),
});

export const petitionType = mysqlTable("petition_type", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const petitionStatus = mysqlTable("petition_status", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const petitionLevel = mysqlTable("petition_level", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const petitionObjectiveType = mysqlTable("petition_objective_type", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const petitionGrant = mysqlTable("petition_grant", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const petitionResearchType = mysqlTable("petition_research_type", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const petition = mysqlTable("petition", {
  id: serial("id").primaryKey(),
  correspondenceNo: text("correspondence_no").notNull(),
  title_th: text("title_th").notNull(),
  title_en: text("title_en").notNull(),
  objectiveId: bigint("objective_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => petitionObjectiveType.id),
  objectiveOther: text("objective_other"),
  grantId: bigint("grant_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => petitionGrant.id),
  grantOther: text("grant_other"),
  researchTypeId: bigint("research_type_id", {
    mode: "number",
    unsigned: true,
  }).references(() => petitionResearchType.id),
  currentLevelId: bigint("current_level_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => petitionLevel.id),
  researcherId: bigint("researcher_id", {
    mode: "number",
    unsigned: true,
  }).notNull(),
  typeId: bigint("type_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => petitionType.id),
  statusId: bigint("status_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => petitionStatus.id),
  note: text("note"),
  staffId: bigint("staff_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => staff.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at").defaultNow().notNull(),
});

export const petitionCommittee = mysqlTable("petition_committee", {
  id: serial("id").primaryKey(),
  petitionId: bigint("petition_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => petition.id),
  levelId: bigint("level_id", { mode: "number", unsigned: true }).references(
    () => petitionLevel.id
  ),
  committeeId: bigint("committee_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => committee.id),
  statusId: bigint("status_id", { mode: "number", unsigned: true }).references(
    () => petitionStatus.id
  ),
  note: text("note"),
  approvedByStaff: bigint("approvedByStaff", { mode: "number", unsigned: true })
    .notNull()
    .references(() => staff.id),
  appreovedAt: timestamp("appreoved_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const petitionDocumentType = mysqlTable("petition_document_type", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
});

export const pettitionFiles = mysqlTable("pettition_files", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  extension: varchar("extension", { length: 10 }).notNull(),
  md5: varchar("md5", { length: 32 }).notNull().unique(),
  petitionId: bigint("petition_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => petition.id),
  documentTypeId: bigint("document_type_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => petitionDocumentType.id),
  createAt: timestamp("created_at").defaultNow().notNull(),
});
