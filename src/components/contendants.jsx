import { useState, useEffect } from "react";
import '../App.css'
import NavBar from "./navBar";

export default function AllContenders(){

    const [page, changePage] = useState(1)
    const [limit, changeLimit] = useState(10)
    const [test, testSet] = useState([])
    const [failing, setFail] = useState(false)
    const [failReason, setFailReason] = useState("")

    useEffect(()=>{
    const getAllContendee = async ()=>{
        try{
            //getCandidates/isealDTB get all normally
            testSet([])
            let contentWait = await fetch(`http://localhost:8000/getCandidates/isealDTB?page=${page}&limit=${limit}`)
            let fetchJson = await contentWait.json();
            console.log(fetchJson[0]["Draft resolution"])
            testSet(fetchJson)
        }catch(err){console.log(err), setFail(true), setFailReason(err)}
        }
        getAllContendee()
    }, [page, limit])

    function changePagePrev(){
        if(page == 1)
            return
        changePage(page-1)
    }
    function changePageFront(){
        changePage(page+1)
    }
    if(test.length==0)
        return(<p>Loading</p>)
    if(failing)
        return(<p>Failed: {failReason}</p>)
    return(
        <div>
            <NavBar />
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