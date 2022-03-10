import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col } from 'react-bootstrap';
import {useState, useEffect} from 'react'; 
import packageJson from '../package.json'; 
import axios from 'axios';

const App = () => {
  const [counts, setCounts] = useState();

  useEffect(() => {
    axios.get(packageJson.baseUrl + 'clickme')
      .then((response) => {
        setCounts(response.data.times_clicked);
      }).catch(function (error) {
        setCounts(0);
        console.log(error);
      })
  }, []);

  const fetchCountsOfTheDay = () => {
    axios.post(packageJson.baseUrl + 'clickme')
      .then((response) => {
        setCounts(response.data.times_clicked);
      }).catch((error) => {
        setCounts(0);
        console.log(error);
      })
  }

  return (
    <div className="App">
      <Row className="mx-0" style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 as={Col} variant="primary">
          {counts} number of times clicked today.
        </h1>
      </Row>

      <Row className="mx-0">
        <Button onClick={fetchCountsOfTheDay} as={Col} variant="primary" style={{ marginLeft: "10px", marginRight: "10px" }}>
          Click Me!
        </Button>
      </Row>
    </div>
  );
}

export default App;
