-- RedefineIndex
DROP INDEX "Pool_code_key";
CREATE UNIQUE INDEX "Poll_code_key" ON "Poll"("code");
