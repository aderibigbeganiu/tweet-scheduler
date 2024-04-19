const { createCanvas, registerFont } = require("canvas");

// Register the font (change the path to your font file if needed)
registerFont("./font.ttf", { family: `"Noto Color Emoji", sans-serif` });

// Function to wrap text
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let lines = [];
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + " ";
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    // Calculate total text height
    const totalTextHeight = lines.length * lineHeight;

    // Calculate y-coordinate to center vertically
    const startY = y - totalTextHeight / 2;

    // Ensure that the text fits within the available vertical space
    const availableVerticalSpace = context.canvas.height - startY;
    if (totalTextHeight > availableVerticalSpace) {
        // If the text exceeds the available vertical space, adjust the lineHeight
        lineHeight *= availableVerticalSpace / totalTextHeight;
    }

    for (let i = 0; i < lines.length; i++) {
        // Calculate the position to center the line horizontally
        const lineWidth = context.measureText(lines[i]).width;
        const startX = x + (maxWidth - lineWidth) / 2;

        context.fillText(lines[i], startX, startY + i * lineHeight);
    }
}

const generateImage = async (gptResponseText) => {
    // Dimensions for the image
    const width = 1000;
    const height = 800;

    // Instantiate the canvas object
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    // Create gradient
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "purple");
    gradient.addColorStop(1, "pink");

    // Fill the rectangle with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    // Add wrapped text
    context.fillStyle = "#ffffff";
    context.font = `48px "Noto Color Emoji", sans-serif`; // Use the registered font
    const maxWidth = width * 0.8; // Maximum width for wrapped text
    const lineHeight = 60; // Initial line height for wrapped text
    const x = (width - maxWidth) / 2; // Center horizontally
    const y = height / 2; // Center vertically
    const text = gptResponseText;

    // Draw the text onto the canvas
    wrapText(context, text, x, y, maxWidth, lineHeight);

    // Write the image to file
    const buffer = canvas.toBuffer("image/png");
    return buffer;
};

generateImage(`Oya, make we jolly dey go! 🚀💃
Join me for d trip of a lifetime $TRIP
We dey carry $BUBBLE, $MOJO, $RICY, $PIXIZ
E no fit better pass dis one! 🌟🌈`)

module.exports = generateImage;
