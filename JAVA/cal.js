
 class calContainer{
  constructor(prevOperandTextElement, currOperandTextElement){
    this.prevOperandTextElement = prevOperandTextElement
    this.currOperandTextElement = currOperandTextElement
    this.clear()
  }

  clear(){
   this.currentOperand = ''
   this.previousOperand = ''
   this.operation = undefined
  }

delete(){
 this.currentOperand = this.currentOperand.toString().slice(0 , -1)
}

appendNumber(number){
  if(number === '.' && this.currentOperand.includes('.'))return 
   this.currentOperand= this.currentOperand.toString() + number.toString()
}

chooseOperation(operation){ 
  if(this.currentOperand === '')return
  if (this.previousOperand !== ''){
    this.compute()
  }
  this.operation = operation
  this.previousOperand = this.currentOperand
  this.currentOperand= ''
}

compute(){
  let computation
  const prev = parseFloat(this.previousOperand)
  const curr = parseFloat(this.currentOperand)

  if (isNaN(prev) ||  isNaN(curr)) return
  switch(this.operation){
    case '+':
      computation = prev + curr
      break

      case '-':
        computation = prev - curr
        break

        case '*':
          computation = prev * curr
          break

          case '/' :
            computation = prev / curr
            break
            default:
              return
  }

  this.currentOperand =computation
  this.operation = undefined
  this.previousOperand =''
}

getDisplayNumber(number){
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.') [0])
  const decimalDigits = stringNumber.split('.') [1]
  let integerDisplay
   if(isNaN(integerDigits)){
    integerDisplay = ''
   } 
   
   else{
    integerDisplay = integerDigits.toLocaleString('en',{
      maximumFractionDigits :0})
   }
  if (decimalDigits != null){
   return `${integerDisplay}. ${decimalDigits}`
  }

else {
  return integerDisplay  
}
}
 
 

  




updateDisplay(){
  this.currOperandTextElement.innerText =
  this.getDisplayNumber(this.currentOperand)
  if(this.operation != null){
    this.prevOperandTextElement.innerText = 
    `${this.getDisplayNumbe(this.previousOperand)} ${this.operation}`
  }else{
    this.prevOperandTextElement.innerText = ''
  }
  
}
 }


 /****
  * 
  
 learning sake
 
 ***** */


  
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operations]')
const equalsButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperandTextElement = document.querySelector('[data-prev-operand]')
const currOprerandTextElement = document.querySelector('[data-curr-operand')


  var calContainer = new calContainer(prevOperandTextElement, currOprerandTextElement);

numberButtons.forEach(button =>{
  button.addEventListener('click', () =>{
    calContainer.appendNumber(button.innerText)
    calContainer.updateDisplay()
  })
})

operationButtons.forEach(button =>{
  button.addEventListener('click', () =>{
    calContainer.chooseOperation(button.innerText)
    calContainer.updateDisplay()
  })
})

equalsButton.addEventListener('click', () =>{
  calContainer.compute();
  calContainer.updateDisplay();
})

allClearButton.addEventListener('click', () =>{
  calContainer.clear()
  calContainer.updateDisplay()
})

delButton.addEventListener('click', () =>{
  calContainer.delete();
  calContainer.updateDisplay();
})

