-- Run this query to check if your test project exists
SELECT id, title FROM projects WHERE title LIKE '%test%';

-- Also check what projects exist
SELECT id, title FROM projects LIMIT 10;
