import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";



const app = express();
const port = 3000;
const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


let bmiValue = 0;
let bmiStatus = "";
let suggestion = "";

function BMICalculator(req, res, next) {
    var Age = req.body["weight"];
    var HeightM = ((req.body["feet"] * 0.3048) + (req.body["inch"] * 0.0254)) ** 2;
    bmiValue = (Age / HeightM).toFixed(1);
    if (bmiValue <= 18.4) {
        bmiStatus = "Underweight";
        suggestion = "You are underweight. It's important to eat a balanced diet and maybe consult with a healthcare provider to ensure you are getting the necessary nutrients.";
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        bmiStatus = "Normal";
        suggestion = "Your weight is normal. Keep maintaining a healthy lifestyle with a balanced diet and regular physical activity.";
    } else if (bmiValue >= 25 && bmiValue <= 39.9) {
        bmiStatus = "Overweight";
        suggestion = "You are overweight. Consider adopting a healthier diet and increasing your physical activity to reach a healthier weight.";
    } else if (bmiValue >= 40) {
        bmiStatus = "Obese";
        suggestion = "You are in the obese category. It is advisable to seek guidance from a healthcare provider to develop a plan for achieving a healthier weight.";
    }
    console.log(bmiValue, bmiStatus, suggestion)
    next()
}

app.use(BMICalculator);

app.get('/', (req, res) => {
    console.log(_dirname, '/public/index.html');
    res.sendFile(_dirname, '/public/index.html');
});

app.post("/submit", BMICalculator, (req, res) => {
    res.render("index.ejs", {
        bmiValue: bmiValue,
        bmiStatus: bmiStatus, 
        suggestion: suggestion })
})

app.listen(port, () => {
    console.log(`Your server is running on https://localhost:${port}`);
})