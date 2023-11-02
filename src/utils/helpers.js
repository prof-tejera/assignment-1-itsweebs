//format time in minutes and seconds
export const formatTime = (time) => { 
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

//display the input time in a user friendly way
export const displayInputTime = (inputTime) => {
    const [minutes, seconds] = inputTime.split(':').map(Number);
    return `${minutes} min${minutes !== 1 ? 's' : ''} ${seconds} sec${seconds !== 1 ? 's' : ''}`;
};