CREATE EVENT protocol_archive_job
ON SCHEDULE
  EVERY 1 YEAR
	STARTS CONCAT(YEAR(CURDATE()) + 1, '-01-01 00:00:00')
DO  
  UPDATE protocol SET is_archived = 1 WHERE YEAR(submission_date) < YEAR(CURDATE());
  
SET GLOBAL event_scheduler = ON;