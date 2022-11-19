import React, { useEffect } from 'react';
import { VictoryPie, VictoryLabel, VictoryChart, VictoryLine } from 'victory';
import logo from './logo.svg';
import './App.css';
import VacanciesService from './services/vacancies';


function App() {
  const vs = new VacanciesService();
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);

  async function handleGetVacancies() {
    try {
      const response = await vs.getVacancies();
      setData(response);

      const response2 = await vs.getVacancies2();
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
    <div style={{ "width": 500 }}>
      {JSON.stringify(data)}
      <VictoryPie
        animate={{ duration: 1000 }}
        colorScale={["blue", "green", "red"]}
        data={data}
      />


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
            <h2 style={{ color: item.color}}>
              {item.name}
            </h2>
          )
        })
      }
    </div>
  );
}

export default App;
