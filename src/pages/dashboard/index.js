import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2'


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            chartData: {
                labels: ['Despesa 1', 'Despesa 2', 'Despesa 3', 'Despesa 4', 'Despesa 5'],
                datasets: [
                    {
                        // Valores das dividas referente a despesas
                        data: [
                            617594,
                            281045,
                            353060,
                            106519,
                            295162,
                            150728
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ]
                    }
                ]
            }
        }
    }

    render() {
        return (
            function sizeOfThings() {
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                
                var screenWidth = screen.width;
                var screenHeight = screen.height;
                
                document.querySelector('.window-size').innerHTML = windowWidth + 'x' + windowHeight;
                document.querySelector('.screen-size').innerHTML = screenWidth + 'x' + screenHeight;
              
              },
          <div>
              <Pie data={this.state.chartData} width={500} height={250}
              options={{
                  responsive: true,

                title: {
                    display: true,
                    text: 'Grafico de Dividas',
                    fontSize: 25,

                },
                legend: {
                    display: true,
                    position: 'left'
                }
              }}
              />
          </div>
        );
    }
}


