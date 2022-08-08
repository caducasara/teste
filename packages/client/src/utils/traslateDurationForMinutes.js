import formatDuration from "format-duration";

const translateDurationForMinutes = (durationPerSecond) => {
    if (!durationPerSecond) {
        return "0:00"
    };
    
    return formatDuration(durationPerSecond * 1000);
}

export default translateDurationForMinutes;