export function getColorFromValue(value) {
    const normalizedValue = Math.max(0, Math.min(100, value));
    const green = Math.round((normalizedValue < 50 ? normalizedValue : 100 - normalizedValue) * 2.55);
    const red = Math.round(normalizedValue < 20 || normalizedValue > 80 ? 255 : 0);

    return `rgb(${red}, ${green}, 0)`;
}
