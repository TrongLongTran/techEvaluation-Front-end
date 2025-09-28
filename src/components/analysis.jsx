import { BarChart } from "./chartMaker/BarChart.jsx"
import { useEffect, useState } from "react"
import NavBar from "./navBar";

export default function IllustrateChart(){
    const [theChart, setChart] = useState(null)
    const [analyze, changeData] = useState(null)
    const [error, setError] = useState("")
    useEffect(()=>{
        let dataSet = {}
        const getAllContendee = async ()=>{
            try{
                //getCandidates/isealDTB get all normally
                let contentWait = await fetch(`http://localhost:8000/getTotalRes/testOne`)
                let fetchJson = await contentWait.json();
                //create data for the chart
                dataSet["labels"] = ["Yes", "No", "Abstain", "No votes"]
                dataSet["datasets"] = [
                    {
                        label: "Votes",
                        data: [fetchJson["vote_distribution"]["Yes"], fetchJson["vote_distribution"]["No"], fetchJson["vote_distribution"]["Abstain"], fetchJson["vote_distribution"]["Non-Voting"]],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(190, 255, 5, 0.2)",
                            "rgba(60, 99, 255, 0.2)"
                        ],
                        borderColor: [
                            "rgba(255, 0, 0, 1)",
                            "rgba(0, 255, 0, 1)",
                            "rgba(0, 0, 255, 1)"
                        ]
                    }
                ]
                if(contentWait.ok){
                    changeData(fetchJson)
                    setChart(dataSet)
                }else
                    setError(fetchJson.error)
            }catch(err){setError("Something is wrong")}
            }
            getAllContendee()
    }, [])
    return( <div>
        <NavBar />
        {theChart ? <BarChart chartData={theChart} /> : <p>Loading chart...</p>}
        <p>{error}</p>
        <div>
            {
            (analyze!=null)?(
                <div>
                    <h1>Analyzation</h1>
                    <p>Winning vote is</p> {
                    (analyze["vote_distribution"]["Yes"] > analyze["vote_distribution"]["No"])?
                    //If yes > no then check yes and Abstain
                    ((analyze["vote_distribution"]["Yes"] > analyze["vote_distribution"]["Abstain"])?
                    (<p>Yes: {analyze["vote_distribution"]["Yes"]}</p>):(<p>Abstain: {analyze["vote_distribution"]["Abstain"]}</p>)):
                    //if no bigger or equal then check no with Abstain
                    ((analyze["vote_distribution"]["No"] > analyze["vote_distribution"]["Abstain"])?
                    (<p>No: {analyze["vote_distribution"]["No"]}</p>) : (<p>Abstain: {analyze["vote_distribution"]["Abstain"]}</p>))
                    }
                    <p>
                        Among <b>{analyze["unique_countries"]}</b> countries
                        <br/>
                    From <b>{analyze["date_range"]["earliest"]}</b> to <b>{analyze["date_range"]["latest"]}</b>
                    </p>
                    <footer></footer>
                </div>
            ):("")
        }
        </div>
        </div>)
}