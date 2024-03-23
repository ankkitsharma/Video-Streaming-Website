-- Create User table
CREATE TABLE Users (
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    age INTEGER,
    img VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Video table
CREATE TABLE Videos (
    videoId SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    imgUrl VARCHAR(255) NOT NULL,
    videoUrl VARCHAR(255) NOT NULL,
    uploadedBy INTEGER REFERENCES Users(userId),
    uploadDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    views INT DEFAULT 0,
);

-- Create Comment table
CREATE TABLE Comments (
    commentId SERIAL PRIMARY KEY,
    videoId INTEGER REFERENCES Videos(videoId),
    userId INTEGER REFERENCES Users(userId),
    commentText TEXT NOT NULL,
    commentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Select all videos for showing on home screen
SELECT 
    v.videoId, 
    v.videoUrl, 
    v.imgUrl, 
    v.title, 
    u.username, 
    v.views, 
    v.uploadDate, 
    u.img 
FROM Videos v 
JOIN Users u ON v.uploadedBy = u.userId;



-- Table that contains videoUrl, title, description, uploadDate, views, likes, dislikes, username, userId for a particular videoId
SELECT v.videoId, v.videoUrl, v.title, v.description, v.uploadDate, v.views, u.username, u.img, u.subscribers, v.uploadedBy 
FROM Videos v
JOIN Users u ON v.uploadedBy = u.userId
WHERE v.videoId = $1;


-- Query to get commentId, username, commentText, commentDate for a particular videoId
SELECT 
    c.commentId, 
    u.username,
    u.img, 
    c.commentText, 
    c.commentDate 
FROM Comments c 
JOIN Users u ON c.userId = u.userId 
WHERE c.videoId = $1;



-- Table for likes and dislikes for videos
CREATE TABLE VideoLikes (
    likeId SERIAL PRIMARY KEY,
    videoId INT REFERENCES Videos(videoId),
    ACTION_TYPE INT,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId INT REFERENCES Users(userId)
);


-- Table to store the subscribers of a user
CREATE TABLE Subscribers (
    subId SERIAL PRIMARY KEY,
    userId INT REFERENCES Users(userId),
    subscriberId INT REFERENCES Users(userId),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




