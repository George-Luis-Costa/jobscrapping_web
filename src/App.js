import React, { useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import VacanciesService from './services/vacancies';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Row, Col, Spinner } from 'react-bootstrap/';
import './style.css';

function Loading() {
  return (

    <Spinner animation="border" role="status" variant="dark" size='lg'>
    </Spinner>

  );
}


export default function App() {
  const vs = new VacanciesService();
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("web");
  const [loading, setLoading] = React.useState(false);


  const isMobail = window.innerWidth < 768;

  async function handleGetVacanciesChart1() {
    try {
      const response = await vs.getVacanciesAmountDayTecnology(selectedType);
      setData(response);

      const response2 = await vs.getVacanciesAmountTecnology();
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
        return item;
      })

      setData2(r1);


    } catch (error) {
      console.log(error);
    }
  }
  async function handleGetVacanciesChart2(type) {
    try {
      const response = await vs.getVacanciesAmountDayTecnology(type);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    handleGetVacanciesChart1();
  }, []);

  return (
    <>
      <h1 className='h1Main'>
        <img src="https://user-images.githubusercontent.com/61352086/194158541-07e551e3-8fd1-4289-b16f-eebf5afb3fad.png" alt="empregos.com.br" width={70} height={70} />
        {" "}
        Gráficos de Vagas na Área por Tecnologia:
      </h1>

      <div className='card'>
        {
          data === undefined || data.length === 0 ||
            data2 === undefined || data2.length === 0
            ? (
              <Loading />
            ) :
            <>
              <div className='container1'>
                <VictoryChart
                  theme={VictoryTheme.material}
                  width={isMobail ? 300 : 1000}
                  height={isMobail ? 300 : 1000}
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
                        <li style={{
                          backgroundColor: item.color, fontSize: "20px"
                        }}>
                          <sapm className="label_stroke">

                            {item.name}
                          </sapm>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </>

        }
      </div>


      <div className='card'>
        <Dropdown className="drop"
          onSelect={async (eventKey) => {
            setSelectedType(eventKey);
            setLoading(true);
            await handleGetVacanciesChart2(eventKey)
            setLoading(false);
            return
          }}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Tipo de Tecnologia
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="mobile">Mobile</Dropdown.Item>
            <Dropdown.Item eventKey="web">Web</Dropdown.Item>
            <Dropdown.Item eventKey="backend">Back-end</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {
          data.length === 0
            ?
            <Loading />
            : <div className='container2'>
              <h2>
                {selectedType.toUpperCase()}
              </h2>
              {
                loading ? <Loading /> : null
              }
              <VictoryPie
                padding={{ top: 40, bottom: 60 }}

                animate={{ duration: 1000 }}
                colorScale={[
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
                ]}
                data={data}
              />
            </div>
        }


      </div>
      <div class="card">
        <h2>Fonte:
          <a href="https://www.empregos.com.br/vagas">empregos.com.br</a>
        </h2>
        <img src="https://user-images.githubusercontent.com/61352086/194158541-07e551e3-8fd1-4289-b16f-eebf5afb3fad.png" alt="empregos.com.br" width={100} height={100} />
      </div>
    </>
  );
}


