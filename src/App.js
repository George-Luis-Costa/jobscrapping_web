import React, { useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryLine } from 'victory';
import VacanciesService from './services/vacancies';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Row, Col } from 'react-bootstrap/';
import './style.css';


function App() {
  const vs = new VacanciesService();
  const [data, setData] = React.useState([]);   // grafico 1
  const [data2, setData2] = React.useState([]); // grafico 2

  async function handleGetVacancies() {
    try {
      const response = await vs.getVacanciesAmountTecnology();
      setData(response);

      const response2 = await vs.getVacanciesAmountDayTecnology();
      const color = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'gray'];

      const r1 = response2.map((item) => {
        item.color = color[Math.floor(Math.random() * color.length)];
        color.pop(color.indexOf(item.color));
        return item;
      })

      setData2(r1);


    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    handleGetVacancies();
  }, []);

  return (
    <>
      <Container className='p-5 my-5'>

        <Container>

          <Row className='containerStyle'>

            <Col>
              <div>
                <Dropdown className='mt-2' style={{ display: "flex" }}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Tipo de Tecnologia
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Mobile</Dropdown.Item>
                    <Dropdown.Item>Web</Dropdown.Item>
                    <Dropdown.Item>Back-end</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* getVacanciesAmountTecnology() */}
                <VictoryChart
                  width={500}
                  height={400}
                >
                  {
                    data2.map((item, index) => {
                      return (
                        <VictoryLine
                          labelComponent={<VictoryLabel text={item.name} />}
                          animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                          }}
                          key={index}
                          data={item.vagas}
                          style={{
                            data: { stroke: item.color }
                          }}
                        />
                      )
                    })
                  }
                </VictoryChart>
              </div>
            </Col>

            <Col>
              <h1 className='mt-5 h2'>Tecnologias:</h1>
              <ul>
                {
                  data2.map((item, index) => {
                    return (
                      <li style={{ color: item.color, fontSize: "15px" }}>
                        {item.name}
                      </li>
                    )
                  })
                }
              </ul>
              {/* </div> */}
            </Col>
          </Row>
        </Container>

        <Container className='mt-4'>
          <Row>
            <div style={{ width: "50%", display: "flex", justifyContent: "center" }}>
              <Col className='containerStyle'>
                {/* Grafico getVacanciesAmountDayTecnology() */}

                <VictoryPie
                  width={300}
                  height={300}
                  padding={{ top: 100, bottom: 100 }}

                  animate={{ duration: 1000 }}
                  colorScale={["blue", "green", "red"]}
                  data={data}
                />

              </Col>
            </div>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default App;
