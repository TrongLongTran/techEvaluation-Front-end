import { useState, useEffect } from "react";
import baseSubmission from "./aFormVote/votingForm";
import '../App.css'
import NavBar from "./navBar";

export default function VotingProcess(){
    const [listLen, setLen] = useState(1);
    const [allValues, setValue] = useState([baseSubmission]);
    const [error, seError] = useState("")
    const [loading, setLoad] = useState(false)

    function changePostValue(e, index, wordPos){
        let omit = [...allValues];
        //ref omit[index] at new object
        omit[index] = {
            ...allValues[index],
            [wordPos]: e
        }
        setValue(omit)
    }

    const submitting = async (e)=>{
        try{
            e.preventDefault()
            setLoad(true)
            const res = await fetch(`http://localhost:8000/getCandidates/resultCountry`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(allValues)
            })
            
            if(res.ok){
                setLoad(false)
                seError("")
                alert("Votes are sent")
            }else{
                setLoad(false)
                let getErr = await res.json()
                seError(getErr.error)
            }
        }catch(err){
            setLoad(false)
            let getErr = await res.json()
            seError(getErr.error)
        }
    }

    const removeaForm = (index)=>{
        if(listLen>1){
            let newList = [...allValues]
            if(index!=0 && index != (listLen-1)){
                newList = newList.slice(0, index).concat(newList.slice(index+1))
                setValue(newList)
            }else if(index==0){
                newList = newList.slice(1)
                setValue(newList)
            }
            else if(index == (listLen-1)){
                newList = newList.slice(0, newList.length-1)
                setValue(newList)
            }
        }else{
            alert("This is the only form left, dont delete it")
        }
    }

    const addNewForm = ()=>{
        setLen(listLen+1)
        setValue([...allValues, baseSubmission])
    }

    return(
        <form onSubmit={submitting} method="post">
            <NavBar />
            {(!loading)?(""):(
                <p>Wait for happiness</p>
            )}
            {(error.length==0)?(""):(
                <p>Hold there pal, something is wrong: {error}</p>
            )}
            {
                allValues.map((va, i)=>(
                    <div className="formAdd" key={i}>
                        <div className="borderFOrButt" onClick={()=>(removeaForm(i))}>Delete this data</div>
                        <label>
                            Title
                            <input onChange={e=>changePostValue(e.target.value, i, 'Title')} value={va["Title"]} required></input>
                        </label>
                        <label>
                            ID
                            <input placeholder="anything < 2 million and > 0" onChange={e=>changePostValue(e.target.value, i, 'id')} value={va["id"]} required></input>
                        </label>
                        <label>
                            Agenda
                            <input onChange={e=>changePostValue(e.target.value, i, 'Agenda')} value={va["Agenda"]} required></input>
                        </label>
                        <label>
                            Vote date
                            <input placeholder="yyyy-mm-dd" onChange={e=>changePostValue(e.target.value, i, 'Vote date')} value={va["Vote date"]} required></input>
                        </label>
                        <div>
                            {/* <label>
                                Vote
                                <input onChange={e=>changePostValue(e.target.value, i, 'Vote')} value={va["Vote"]} required></input>
                            </label> */}
                            <label>
                                Vote summary
                                <input onChange={e=>changePostValue(e.target.value, i, 'Vote summary')} value={va["Vote summary"]} required></input>
                            </label>
                            <label>
                                Resolution
                                <input onChange={e=>changePostValue(e.target.value, i, 'Resolution')} value={va["Resolution"]} required></input>
                            </label>
                            <label>
                                Note
                                <input onChange={e=>changePostValue(e.target.value, i, 'Note')} value={va["Note"]} required></input>
                            </label>
                            <label>
                                Collections
                                <input onChange={e=>changePostValue(e.target.value, i, 'Collections')} value={va["Collections"]} required></input>
                            </label>
                            <label>
                                Meeting Record
                                <input onChange={e=>changePostValue(e.target.value, i, 'Meeting Record')} value={va["Meeting Record"]} required></input>
                            </label>
                            <label>
                                Draft resolution
                                <input onChange={e=>changePostValue(e.target.value, i, 'Draft resolution')} value={va["Draft resolution"]} required></input>
                            </label>
                        </div>
                        <p>Optional</p>
                        <label>
                            Committee report
                            <input onChange={e=>changePostValue(e.target.value, i, 'Committee report')} value={va["Committee report"]}></input>
                        </label>
                    </div>
                ))
            }
            <div className="borderFOrButt" onClick={addNewForm}>Add a form</div>
            <button type="submit">Submit</button>
        </form>
    )
}