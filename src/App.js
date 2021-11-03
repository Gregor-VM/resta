import './App.css';
import {useState, useEffect, useCallback} from 'react';

function App() {

  const [numbers, setNumbers] = useState({first:null, second:null, third: null, symbol:null}); 
  const [correct, setCorrect] = useState();
  const [incorrect, setIncorrect] = useState();
  const [loading, setLoading] = useState(false);

  const generateNumbers = useCallback(
    () => {

      const generateFourDigitsNumber = () => {
        const response = Math.floor( Math.random() * 10000 );
        if((response+"").length >= 4) return response;
        if((response+"").length < 4) return generateFourDigitsNumber();
      }

      const generateTwoValidNumbersForMinus = () => {

        const first = generateFourDigitsNumber();
        const second = generateFourDigitsNumber();

        if(first > second) return {first, second};
        if(second > first) return generateTwoValidNumbersForMinus();

      }

      const generateTwoValidNumbersForSum = () => {

        const first = generateFourDigitsNumber();
        const second = generateFourDigitsNumber();
        return {first, second};

      }

      const randomN = Math.random();

      if(randomN >= 0.5){
        const {first, second} = generateTwoValidNumbersForMinus();
        setNumbers({first, second, third: (first - second)});
      } else{
        const {first, second} = generateTwoValidNumbersForSum();
        setNumbers({first, second, third: first + second});
      }

    },
    [setNumbers],
  )



  const showCorrect = () => {
    setCorrect(true);
    setLoading(true);
    setTimeout(() => {
      setCorrect(false);
      setLoading(false);
    }, 3000);
    generateNumbers();
  }

  const showIncorrect = () => {
    setIncorrect(true);
    setLoading(true);
    setTimeout(() => {
      setIncorrect(false);
      setLoading(false);
    }, 2000);
    generateNumbers();
  }

  const validateAnswer = (minus) => {

    console.log(numbers.first, numbers.second, numbers.third)
    console.log((numbers.first - numbers.second))
    console.log((numbers.first + numbers.second))
    console.log((numbers.first + numbers.second === numbers.third))

    if(minus && (numbers.first - numbers.second === numbers.third)) return showCorrect();
    if(!minus && (numbers.first + numbers.second === numbers.third)) return showCorrect();
    showIncorrect();
  }



  useEffect(() => {
    generateNumbers();
  }, [generateNumbers])

  return (
    <div className="App">
      <div className="container">
        {!loading && (
          <>
          <p className="firstNumber">{numbers.first}</p>
          <div className="symbol"></div>
          <p className="secondNumber">{numbers.second}</p>
          <div>=</div>
          <p className="thirdNumber">{numbers.third}</p>
          </>
        )}
      </div>

      <div className="select">
        {!loading && (
          <>
          <span onClick={() => validateAnswer(false)}>+</span>
          <span onClick={() => validateAnswer(true)}>-</span>
          </>
        )}
        {correct && (
          <button>Correcto</button>
        )}

        {incorrect && (
          <button className="red">Incorrecto</button>
        )}
      </div>
    </div>
  );
}

export default App;
