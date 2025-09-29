import { useState, useEffect } from "react";
import '../App.css'
import NavBar from "./navBar";

export default function AllContenders(){

    const [page, changePage] = useState(1)
    const [limit, changeLimit] = useState(10)
    const [test, testSet] = useState([])
    const [failReason, setFailReason] = useState("")

    useEffect(()=>{
    const getAllContendee = async ()=>{
        try{
            //getCandidates/isealDTB get all normally with page and limit to paginating
            testSet([])
            let contentWait = await fetch(`http://localhost:8000/getCandidates/isealDTB?page=${page}&limit=${limit}`)
            let fetchJson = await contentWait.json();
            if(contentWait.ok)
                testSet(fetchJson)
            else
                setFailReason(fetchJson.error)
        }catch(err){console.log(err), setFailReason("Something is wrong")}
        }
        getAllContendee()
    }, [page, limit])

    //prevent page to be <0
    function changePagePrev(){
        if(page == 1)
            return
        changePage(page-1)
    }
    //get page to go up
    function changePageFront(){
        changePage(page+1)
    }
    if(test.length==0)
        return(<p>Loading</p>)
    return(
        <div>
            <NavBar />
            <p>{failReason}</p>
            <div className="overAllStyle">
            {test.map((content)=>(
                <div key={content.id} className="contentName">
                    <h3>{content["Title"]}</h3>
                    <p>{content["Vote date"]}</p>
                    <div className="moreInfo">
                        <hr></hr>
                        <p><b>Agenda:</b> {content["Agenda"]}</p>
                        <p><b>Resolution:</b> {content["Resolution"]}</p>
                        <p><b>Summary:</b> {content["Vote summary"]}</p>
                    </div>
                    <div>
                        <p><b>Hover to see countries results</b></p>
                        <ul>
                            {Object.entries(content["Vote"]).map(([country, choice])=>(
                                <li key={country}>
                                    {country}: {choice || "No choice"}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
            </div>
            <div>
                {page}
                <button onClick={changePagePrev}>Previous</button>
                <button onClick={changePageFront}>Continue</button>
            </div>
        </div>
    )
}