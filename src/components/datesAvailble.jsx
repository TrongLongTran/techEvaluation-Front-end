//get all from the date, submit button will be sticky
import { useState, useEffect } from "react";
import { data } from "react-router-dom";
import NavBar from "./navBar";

export default function AllFilteredPosts(){
    const [typingDate, changeDate] = useState("")
    const [allDates, changeAllDates] = useState([])
    let previousDate = ""
    const [page, changePage] = useState(1)
    const [limit, changeLimit] = useState(10)
    const [test, testSet] = useState([])
    const [error, setError] = useState("")

    let count = 0;

    function changePagePrev(){
        if(page == 1)
            return
        let pageChange = page-1;
        changePage(page-1)
        findResult(pageChange)
    }
    function changePageFront(){
        let pageChange = page+1;
        changePage(pageChange)
        findResult(pageChange)
    }

    useEffect(()=>{
        //this will get all time and make it into a suggestion search
        fetch(`http://localhost:8000/getCandidates/allTimeLine`)
        .then(data=>data.json())
        .then(addInAll=>changeAllDates(addInAll))
        .catch(err=>{setError(err), changeAllDates([])})
    }, [])

    const findResult = async (page)=>{
        try{
            
            //this will allow filter 
            let contentWait = await fetch(`http://localhost:8000/getCandidates/historiesVotes?page=${page}&limit=${limit}&days=${typingDate}`)
            let changeRes = await contentWait.json()
            changeAllDates([])
            if(!contentWait.ok){
                testSet([])
                setError(changeRes.error);
            }else{
                //preventing page from go too far (bugged)
                if(changeRes.length==0){return changePage(page-1)}
                testSet(changeRes)
                setError("")
            }
        }catch(err){alert(err), testSet([])}
    }

    return(
        <div>
            <NavBar />
            <div>
                <input type="text" onChange={e=>changeDate(e.target.value)} value={typingDate} placeholder="Type somethign here"></input>
                <button onClick={()=>{findResult(1), changePage(1)}}>Search</button>
            </div>
            <p>{error}</p>
            <div>
                {
                //true then filter
                //&& data['Vote date'] != typingDate not working properly and some dates repeating
                typingDate.length!=0 && allDates.filter(item => item['Vote date'].startsWith(typingDate) && data['Vote date'] != typingDate)
                .map(data=>(
                    previousDate!=data['Vote date']?(
                        <div className="findItems" key={data._id} onClick={()=>{changeDate(data['Vote date']), testSet([]), setError("")}}>
                            {data['Vote date']}
                        </div>
                    ):("")
                ))
                }
            </div>
            <div className="overAllStyle">
            {
                //Comma discarded the map
            //will run after press search
                (test.length!=0)?
                    (<>
                        {test.map((content)=>(
                        <div key={count} className="contentName">
                            <h3>{content["Title"]}</h3>
                            <p>{content["Vote date"]}</p>
                            <div className="moreInfo">
                                <hr></hr>
                                <p><b>Agenda:</b> {count=count+1} {content["Agenda"]}</p>
                                <p><b>Resolution:</b> {content["Resolution"]}</p>
                                <p><b>Summary:</b> {content["Vote summary"]}</p>
                            </div>
                        </div>
                    ))}
                    <div className="fixedIn">
                        <p>{page}</p>
                        <button onClick={changePagePrev}>Previous</button>
                        <button onClick={changePageFront}>Continue</button>
                    </div>
                    </>):(<p>No items found</p>)
                }
            </div>
        </div>
    )
}