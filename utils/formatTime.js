export const formatTime = (seconds) => {
    const rest = (seconds % 60).toFixed(0);
    const minutes = Math.floor(seconds / 60); 
    const restSeconds = rest < 10 ? `0${rest}` : rest;
    return `${minutes}:${restSeconds}`

}

/*
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);  // Hela minuter
    const remainingSeconds = Math.floor(seconds % 60);  // Resterande sekunder
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;  // Format mm:ss
  }*/