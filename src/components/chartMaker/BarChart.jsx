import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title)

export const BarChart = ({chartData})=>{
    const option = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Graph representing amount of votes (Y, N, A, NV)"
            }
        }
    }
    return <Bar options={option} data={chartData} />;

}