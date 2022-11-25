import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState} from "react";
import { useSpring, animated } from 'react-spring'

function App() {
  const [allData, setAllData] = useState([])
  const [text, setText] = useState("")
  const [author, setAuthor] = useState("")
  const [color, setColor] = useState("")
  const [fadeIn, set] = useSpring(() => ({ opacity: 0}))
  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#ff6a00',
    '#77B1A9',
    '#73A857'
  ];

  //Fetching data after everything else has been loaded on screen and setting data to allData
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
    .then(res => res.json())
    .then(data => {
      setAllData(data)
      newQuote(data)
    })
  }, [])

  useEffect(() => {
      set({ opacity: 1, from: { opacity: 0 }, config: {duration: 1000}});
  }, [text])


  //Take full array of data and give a single random object from it.
  function newQuote(data) {
     const randomIndex = Math.floor(Math.random() * data.length);
     const randomColor = Math.floor(Math.random() * colors.length);
     //get a random number between 0 to length of array
     setAuthor(data[randomIndex].author);
     setText(data[randomIndex].text);
     setColor(colors[randomColor]);

  }
  
  return (
    <div style={{backgroundColor: `${color}`}} className="App">
      <div id="quote-box">
        <animated.div style={fadeIn} id="quote-text">
          <FontAwesomeIcon icon={faQuoteLeft} className="quote-left-icon" style={{color: `${color}`}}/>
          <span id="text" style={{color: `${color}`}}> {text}</span>
          <cite id="author" style={{color: `${color}`}}>  - {author ? author : "Unknown"}</cite>
        </animated.div>
        <div id="bottom">
          <a 
            className="twitter-share-button" 
            href={`https://twitter.com/intent/tweet?text="${text}"%0a~${author}`} 
            target="_blank"
            id="tweet-quote"
          >
              <FontAwesomeIcon 
                icon={faTwitter} 
                className="twitter-icon" 
                style={{backgroundColor: `${color}`}}
              />
          </a>
          <button style={{backgroundColor: `${color}`}} id="new-quote" onClick={() => newQuote(allData)}>New quote</button>
        </div>
      </div>
    </div>
  )
}

export default App
