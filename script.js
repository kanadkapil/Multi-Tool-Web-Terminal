// script.js


document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const commandInput = document.getElementById("commandInput");

    // Display welcome message and instructions
    displayOutput("Welcome to My Multi Tool Terminal Project! Type 'help' for instructions.");

    // Function to handle user commands
    function handleCommand(event) {
        if (event.key === "Enter") {
            const command = commandInput.value.trim();
            processCommand(command);
            commandInput.value = "";
        }
    }

    // Function to process user commands
    function processCommand(command) {
        let response = "";
        const parts = command.split(" ");
        const mainCommand = parts[0];

        switch (mainCommand) {
            case "help":
                response = "Available commands:\n1. calc <num1> <operator> <num2>: Perform basic arithmetic operations.\n2. base <num> <from_base> <to_base>: Convert numbers between different bases.\n3. area <shape> <dimensions>: Calculate the area of various shapes.\n4. time: Display current time.\n5. weather <city>: Get the current weather of a city.\n6. color <color>: Change the background color.\n\nUsage: Type the command followed by its parameters (if any).";
                break;
            default:
                response = "Unknown command. Type 'help' for a list of available commands.";
                break;
        }

        displayOutput(response);
    }

    // Function to display output in the terminal
    function displayOutput(text) {
        const newLine = document.createElement("div");
        newLine.textContent = "> " + text;
        output.appendChild(newLine);
        output.scrollTop = output.scrollHeight;
    }

    // Event listener to handle user input
    window.handleCommand = handleCommand;
});


document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const commandInput = document.getElementById("commandInput");

    function handleCommand(event) {
        if (event.key === "Enter") {
            const command = commandInput.value.trim();
            processCommand(command);
            commandInput.value = "";
        }
    }

    function processCommand(command) {
        let response = "";
        const parts = command.split(" ");
        const mainCommand = parts[0];

        switch (mainCommand) {
            case "help":
                response = "Available commands: help, calc, base, area, time, weather, color";
                break;
            case "calc":
                response = calculate(parts.slice(1));
                break;
            case "base":
                response = baseConvert(parts.slice(1));
                break;
            case "area":
                response = calculateArea(parts.slice(1));
                break;
            case "time":
                response = new Date().toLocaleTimeString();
                break;
            case "weather":
                if (parts.length < 2) {
                    response = "Usage: weather <city>";
                } else {
                    const city = parts.slice(1).join(" ");
                    getWeather(city);
                    return; // Return early to handle async call
                }
                break;
            case "color":
                response = changeColor(parts[1]);
                break;
            default:
                response = "Unknown command. Type 'help' for a list of available commands.";
                break;
        }

        displayOutput(response);
    }

    function displayOutput(text) {
        const newLine = document.createElement("div");
        newLine.textContent = "> " + text;
        output.appendChild(newLine);
        output.scrollTop = output.scrollHeight;
    }

    function calculate(params) {
        if (params.length < 3) return "Usage: calc <num1> <operator> <num2>";
        const num1 = parseFloat(params[0]);
        const operator = params[1];
        const num2 = parseFloat(params[2]);

        if (isNaN(num1) || isNaN(num2)) return "Invalid numbers provided.";

        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num2 !== 0 ? num1 / num2 : "Cannot divide by zero.";
            case "%":
                return num1 % num2;
            default:
                return "Invalid operator. Use +, -, *, /, %.";
        }
    }

    function baseConvert(params) {
        if (params.length < 3) return "Usage: base <num> <from_base> <to_base>";
        const num = params[0];
        const fromBase = parseInt(params[1]);
        const toBase = parseInt(params[2]);

        if (isNaN(fromBase) || isNaN(toBase)) return "Invalid base provided.";

        return parseInt(num, fromBase).toString(toBase);
    }

    function calculateArea(params) {
        if (params.length < 2) return "Usage: area <shape> <dimensions>";
        const shape = params[0];
        const dimensions = params.slice(1).map(Number);

        switch (shape) {
            case "square":
                return dimensions[0] ** 2;
            case "circle":
                return Math.PI * dimensions[0] ** 2;
            case "cone":
                return Math.PI * dimensions[0] * (dimensions[0] + Math.sqrt(dimensions[1] ** 2 + dimensions[0] ** 2));
            case "cylinder":
                return 2 * Math.PI * dimensions[0] * (dimensions[0] + dimensions[1]);
            case "parabola":
                return "Area of a parabola is not defined by simple dimensions.";
            case "hyperbola":
                return "Area of a hyperbola is not defined by simple dimensions.";
            case "ellipse":
                return Math.PI * dimensions[0] * dimensions[1];
            case "cube":
                return 6 * dimensions[0] ** 2;
            case "sphere":
                return 4 * Math.PI * dimensions[0] ** 2;
            default:
                return "Unknown shape. Available shapes: square, circle, cone, cylinder, parabola, hyperbola, ellipse, cube, sphere.";
        }
    }

    function changeColor(color) {
        const validColors = ["red", "green", "blue", "yellow", "violet", "white", "orange", "pink", "grey"];
        if (!validColors.includes(color)) return "Invalid color. Use red, green, blue, yellow, violet, white, orange, pink, grey.";
        document.body.style.backgroundColor = color;
        return `Changed color to ${color}`;
    }

    function getWeather(city) {
        const apiKey = "YOUR_API_KEY";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weather = `Weather in ${data.name}: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`;
                displayOutput(weather);
            })
            .catch(error => displayOutput("Failed to fetch weather data."));
    }

    window.handleCommand = handleCommand;
});
