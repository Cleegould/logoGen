const fs = require('fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
}

const questions = [
    {
        type: "input",
        name: "text",
        message: "What text would you like in your Logo? Please use only 3 Characters:",
    },
    {
        type: "input",
        name: "textColor",
        message: "What color would you like your logo text to be?",
    },
  {
        type: "list",
        name: "shapeChoice",
        message: "Choose which Pixel Image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    },
	{
        type: "input",
        name: "shapeColor",
        message: "What color would you like your shape to be?",
    },
];

function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Your Logo has been Generated");
    });
}

async function init() {
	var svgString = "";
	var svg_file = "logo.svg";

    
    const answers = await inquirer.prompt(questions);

	
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		
		user_text = answers.text;
	} else {
		
		console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
	}
	console.log("User text: [" + user_text + "]");
	
	user_font_color = answers["textColor"];
	console.log("User font color: [" + user_font_color + "]");
	
	user_shape_color = answers.shapeColor;
	console.log("User shape color: [" + user_shape_color + "]");

	user_shape_type = answers["shapeChoice"];
	console.log("User entered shape = [" + user_shape_type + "]");
	
	
	let user_shape;
	if (user_shape_type === "Square" || user_shape_type === "square") {
		user_shape = new Square();
		console.log("Square Chosen");
	}
	else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
		console.log("Circle Chosen");
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
		console.log("Triangle Chosen");
	}
	
	user_shape.setColor(user_shape_color);

	var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgString = svg.render();
	
	writeToFile(svg_file, svgString); 
}
init()