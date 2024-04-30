const ytdl = require('ytdl-core');
const fs = require('fs');

const videoUrl = 'https://www.youtube.com/watch?v=p9PjIAoRgLo'; // Replace VIDEO_ID with the actual YouTube video ID

// Function to download the YouTube video
const downloadVideo = async (url) => {
    try {
        const info = await ytdl.getInfo(url);
        const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });

        if (!videoFormat) {
            throw new Error('No video format found');
        }

        const videoTitle = info.videoDetails.title;
        const videoFile = `${videoTitle}.mp4`;

        ytdl(url, { format: videoFormat })
            .pipe(fs.createWriteStream(videoFile))
            .on('finish', () => {
                console.log(`Video downloaded successfully: ${videoFile}`);
            });
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const downloadAudio = async (url) => {
    try {
        const info = await ytdl.getInfo(url);
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

        if (!audioFormat) {
            throw new Error('No audio format found');
        }

        const audioTitle = info.videoDetails.title;
        const audioFile = `${audioTitle}.mp3`;

        ytdl(url, { filter: 'audioonly' })
            .pipe(fs.createWriteStream(audioFile))
            .on('finish', () => {
                console.log(`Audio downloaded successfully: ${audioFile}`);
            });
    } catch (error) {
        console.error('Error:', error.message);
    }
};


downloadAudio(videoUrl);