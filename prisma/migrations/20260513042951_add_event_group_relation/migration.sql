-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME,
    "timezone" TEXT,
    "isInPerson" BOOLEAN NOT NULL DEFAULT true,
    "locationName" TEXT,
    "address" TEXT,
    "audience" TEXT,
    "ageRestriction" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" TEXT NOT NULL,
    "churchId" TEXT,
    "createdById" TEXT NOT NULL,
    "groupId" TEXT,
    CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("address", "ageRestriction", "audience", "categoryId", "churchId", "createdAt", "createdById", "description", "endsAt", "id", "imageUrl", "isInPerson", "locationName", "startsAt", "timezone", "title", "updatedAt") SELECT "address", "ageRestriction", "audience", "categoryId", "churchId", "createdAt", "createdById", "description", "endsAt", "id", "imageUrl", "isInPerson", "locationName", "startsAt", "timezone", "title", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE INDEX "Event_startsAt_idx" ON "Event"("startsAt");
CREATE INDEX "Event_categoryId_idx" ON "Event"("categoryId");
CREATE INDEX "Event_groupId_startsAt_idx" ON "Event"("groupId", "startsAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
