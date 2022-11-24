import React, { useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryLine } from 'victory';
import logo from './logo.svg';
import './App.css';
import VacanciesService from './services/vacancies';
import Dropdown from 'react-bootstrap/Dropdown';



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
      <div style={{ "width": 300 }}>
        {/* Grafico getVacanciesAmountDayTecnology() */}
        <VictoryPie
          animate={{ duration: 1000 }}
          colorScale={["blue", "green", "red"]}
          data={data}
        />

        <div>
          {/* <select>
            <option>Mobile</option>
            <option>Web</option>
            <option>Back-end</option>
          </select> */}

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Tipo de Tecnologia
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Mobile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Web</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Back-end</Dropdown.Item>
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
        </div>
      </div>
    </>
  );
}

export default App;
