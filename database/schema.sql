-- Database Schema for Recycling Production Line Manager Selection System

CREATE TABLE IF NOT EXISTS candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    experience_years INT NOT NULL,
    skills TEXT NOT NULL, -- Stored as JSON string or comma-separated values
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    crisis_management_score DECIMAL(5, 2) NOT NULL, -- Score out of 10 or 100
    sustainability_score DECIMAL(5, 2) NOT NULL,
    team_motivation_score DECIMAL(5, 2) NOT NULL,
    average_score DECIMAL(5, 2) GENERATED ALWAYS AS (
        (crisis_management_score + sustainability_score + team_motivation_score) / 3
    ) STORED,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rankings (
    candidate_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    total_score DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- Trigger to auto-update rankings after a new evaluation is added
DELIMITER //
CREATE TRIGGER after_evaluation_insert
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    INSERT INTO rankings (candidate_id, name, total_score)
    SELECT 
        NEW.candidate_id,
        c.name,
        NEW.average_score
    FROM candidates c
    WHERE c.id = NEW.candidate_id
    ON DUPLICATE KEY UPDATE
        total_score = NEW.average_score;
END;
//
DELIMITER ;
