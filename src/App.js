import React, { useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryLine } from 'victory';
import VacanciesService from './services/vacancies';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Row, Col } from 'react-bootstrap/';




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
      <Container fluid='sm'>
        <Row>
          <Col>
            <div style={{ "width": "100%" }}>
              {/* Grafico getVacanciesAmountDayTecnology() */}
              <VictoryPie
                animate={{ duration: 1000 }}
                colorScale={["blue", "green", "red"]}
                data={data}
              />
            </div>

          </Col>

          <Col>
            <Dropdown>
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
            <VictoryChart>
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
            {
              data2.map((item, index) => {
                return (
                  <h2 style={{ color: item.color }}>
                    {item.name}
                  </h2>
                )
              })
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
