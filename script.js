// display
const passwordDisplay = document.querySelector("[data-passwordDisplay");

// copy password
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

// length
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-lengthSlider]");

// checkboxes
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

// indicator
const indicator = document.querySelector("[data-indicator]");

// generate button
const generateBtn = document.querySelector(".generateButton");

// symbol
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();

console.log("shadow color chnage1")


setIndicator("#ccc");



//circle strength

//function:
// copycontent()
// handleslider()
// listner on generate password()
// color chnage on circle set indictaor() strength
// random integer function()
// get random uppercase 
// Checkget random  
// lower caseget random
// random mumber
//  get random symbol
//  chnage in color calculate strenth weak n 


//password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength - min) * 100) / (max - min) +"%  100%";
}



    function setIndicator(color){
        indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}



    function getRndInteger(min,max)
    {
      return Math.floor(Math.random()*(max-min)) + min;
    }
    function generateRandomNumber()
    {
        return getRndInteger(0,9);
    }

   

    function generateLowerCase(){
        return String.fromCharCode(getRndInteger(97,123));
    }

    function generateUpperCase(){
        return String.fromCharCode(getRndInteger(65,90));
    }

    function generateSymbols(){
        const randNum=getRndInteger(0,symbols.length);
        return symbols.charAt(randNum);
    }

    console.log("yaha sab theek hai");

    function calcStrength(){
        let hasUpper = false;
        let hasLower = false;
        let hasNum = false;
        let hasSym = false;
    
        if(uppercaseCheck.checked) hasUpper = true;
        if(lowercaseCheck.checked) hasLower = true;
        if(numbersCheck.checked) hasNum = true;
        if(symbolsCheck.checked) hasSym = true;
    
        if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
            setIndicator("#0f0");
        }
        else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength >= 6){
            setIndicator("#ff0");
        }
        else{
            setIndicator("#f00");
        }
    }

  async function copyContent(){
        try {
            await navigator.clipboard.writeText(passwordDisplay.value);
            copyMsg.innerText="coppied";
        } 
        catch (e) {

            copyMsg.innerText="failed";
            
        }

        copyMsg.classList.add("active");

        setTimeout( () => {
            copyMsg.classList.remove("active");
        },2000);    

     } 


     
     function shufflePassword(array){
        
            for (let i = array.length - 1; i > 0; i--) {
              // find out random j
              const j = Math.floor(Math.random() * (i + 1));
              // swap 2 numbers
              const temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
            let str = "";
            //array.forEach((el) => (str += el));
            str = array.join("");
            return str;
        }

    
     
     function handleCheckBoxChange() {
        checkCount=0;
        allCheckBox.forEach((checkbox) =>{

            if(checkbox.checked)
               checkCount++;
        });
     }


     //specuil

     if(passwordLength<checkCount)
     {
        passwordLength=checkCount;
        handleSlider();
     }

     allCheckBox.forEach((checkbox) =>{

        checkbox.addEventListener('change', handleCheckBoxChange);
     });
     

     inputSlider.addEventListener('input',(e) => {

        passwordLength=e.target.value;
        handleSlider();
     });

     copyBtn.addEventListener('click' , () =>{

        if(passwordDisplay.value)
        copyContent();
     })

        generateBtn.addEventListener('click', () =>{

            //none of the chekbox is selected

            if(checkCount==0) return;

            if(passwordLength<checkCount){
                passwordLength=checkCount;
                handleSlider();
            }

            //lets strat the journey to find new password

            console.log("hello starting the journey")
            //remove old password

           

            //lets put the stuff mentioned by chkcbox

            // if(uppercaseCheck.checked){
            //     password+=generateUpperCase();
            // }
            // if(lowercaseCheck.checked){
            //     password+=generatelowerCase();
            // }
            // if(numbersCheck.checked){
            //     password+=generateRandomNumber();
            // }
            // if(symbolsCheck.checked){
            //     password+=generateSymbols();
            // }

                password="";

             console.log("hello bro");
                let funcArr=[];

                if (uppercaseCheck.checked)
                {
                    funcArr.push(generateUpperCase);
                }

                console.log("hello bro2 ");

                if(lowercaseCheck.checked)
                {
                    funcArr.push(generateLowerCase);
                }


                if(numbersCheck.checked)
                {
                    funcArr.push(generateRandomNumber);
                }


                if(symbolsCheck.checked)
                {
                    funcArr.push(generateSymbols);
                }

                //cumpulsory


                for(let i=0;i<funcArr.length; i++){
                    password+=funcArr[i]();
                }

                console.log("cumpulsory addition done");

                //remaining addition
                
                for(let i=0; i < passwordLength - funcArr.length; i++){
                    let randIndex = getRndInteger(0, funcArr.length);
                    password += funcArr[randIndex]();
                }

                console.log("remaining addition done");

                password = shufflePassword(Array.from(password));
                console.log("suffling done");

                passwordDisplay.value = password;
                console.log("UI addition done");

             calcStrength();
            


        });

























     
