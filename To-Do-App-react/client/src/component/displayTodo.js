import "bootstrap/dist/css/bootstrap.min.css"
import "./style.css"
import axios from "axios"
import { useEffect,useState,useRef } from "react"
import {FaTrashAlt,FaEdit,FaRegWindowClose} from "react-icons/fa"
import {edit} from "./action.js"
import {connect} from "react-redux"

const Displaytodo = (props) => {
  const {task} = props
  const [to_do_data,setto_do_data] = useState("")
  const [boolean,setBoolean] = useState(false)
  const [id,setid] = useState()
  const [checkArray,setcheckArray] = useState([])
  const ref = useRef()


  const fetching = async () => {
    return await axios.get("http://localhost:4000/todo/getdata")
  }

  useEffect(() => {
    fetching()
      .then(data =>setto_do_data(data.data))
      .catch(error => console.log(error))
  },[task])

  

  const handleDelete = (id) => {
    let body = {task : parseInt(id)}
    axios.delete("http://localhost:4000/todo/delete",{data : body})
    .then(() => fetching().then(res => setto_do_data(res.data)))
    .catch(error =>console.log(error))
  }

  const handleDes = (e) => {
    setBoolean(!boolean)
    setid(e.target.id)
  }

  const handleCheck = (e) => { 
    if(e.target.checked){
      setcheckArray((prev) => {
        return [...prev,parseInt(e.target.id)]
      })
    }else{
      let filtered = checkArray.filter(ele => ele !== parseInt(e.target.id))
      setcheckArray(filtered)
    }
}

const handleCheckList = () => {
  if(checkArray.length === 0){alert("no checked")}
  else{
    console.log(checkArray)
    axios.delete("http://localhost:4000/todo/checked",{data : {checkedBoxList : checkArray}})
    .then(() => fetching().then(res => setto_do_data(res.data)))
    .catch(error =>console.log(error))
    setcheckArray([])
  }
}
  return(
  <div className="">
    {to_do_data.length >= 1?<p className="text-center">Click on the task for Description</p>:null}
    <div className="d-flex justify-content-center gap-5 mt-5">
      <ul className="ul d-flex flex-column">
        {to_do_data.length >= 1?to_do_data.map((ele,index) => {
          return(
              <li className="li d-flex justify-content-between" key= {index} style={{textDecoration:checkArray.includes(ele.id) === true?"line-through":"none"}}>
                  <form className="d-flex gap-2">
                  <input ref={ref} id={ele.id} onClick={handleCheck} type="checkbox"/>
                  <span id={index} className="task" onClick={handleDes}>
                    {ele.to_do}
                   </span>
                  </form>
                  <div className="d-flex gap-3 position-relative">
                    <span className="fa" onClick={() => props.editing(ele.to_do,ele.id,ele.description)}> <FaEdit /></span>
                    <span className="fa" onClick={() => handleDelete(ele.id)}><FaTrashAlt /></span>
                    {boolean && index === parseInt(id)?to_do_data.map((ele,index) => {
                        if(parseInt(id) === parseInt(index)){
                          return(
                        <p style={{width:"200px"}} key={index} className="description" >Description : {ele.description} <FaRegWindowClose className="desCloseButton" onClick={() => setBoolean(!boolean)}/></p>
                          )
                    }
                    }):null}
                  </div>
              </li>
              )
            }): to_do_data?<p>No Tasks</p>:<p>Loading...</p>}
      </ul>
    </div>
    <div className="d-flex justify-content-center">
    {checkArray.length >= 1?<button onClick={handleCheckList} className="text-dark">Remove Checked</button>:null}
    </div>
  </div>
  )
}

  const mapDispatchToStore = (dispatch) => {
    return {
      editing : (val,id,des) => dispatch(edit(val,id,des)),
    }
  }


export default connect(null,mapDispatchToStore)(Displaytodo)