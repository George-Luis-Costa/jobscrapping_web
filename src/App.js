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
      let color = [
        '#3C4664',
        '#64A3B1',
        '#3BB85A',
        '#A7AD62',
        '#BE8951',
        '#ff79c6',
        '#8065A7',
        '#A33535',
        '#A3A3A3',
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#0000FF",
        "#4B0082",
        "#9400D3"
      ];

      let index = 0;
      const r1 = response2.map((item) => {
        item.color = color[index];
        index++;
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
      <h1 className='h1Main'>Gráficos de Vagas na Área de Tecnologia:</h1>
      <div className='wrapper'>

        <div className='card'>
          <div className='container'>
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

          <div class="info">
            <h1>Tecnologias:</h1>
            <ul>
              {
                data2.map((item, index) => {
                  return (
                    <li style={{ backgroundColor: item.color, fontSize: "20px" }}>
                      {item.name}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>


        <div className='card'>
          <div className='container'>
            <VictoryPie
              width={300}
              height={300}
              padding={{ top: 40, bottom: 60 }}

              animate={{ duration: 1000 }}
              colorScale={["blue", "green", "red"]}
              data={data}
            />
          </div>


        </div>
      </div>
    </>
  );
}

export default App;
