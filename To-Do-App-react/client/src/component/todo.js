import "bootstrap/dist/css/bootstrap.min.css"
import {useEffect,useState} from "react"
import axios from "axios"
import Displaytodo from "./displayTodo"
import {connect} from "react-redux"
import {empty} from "./action.js"
import {FaAngellist} from "react-icons/fa"

const Todo = (props) => {
  const {id,value,description} = props
  const [tasks,settasks] = useState([])
  const [input,setInput] = useState("")
  const [dnone,setdnone] = useState("")
  const [descriptions,setdescription] = useState("")

  useEffect(() => {
    setInput(value)
    setdescription(description)
    if(value !== ""){
      setdnone("")
    }else{
      setdnone("dNone")
    }
  },[value,description])

  const fetching = async () => {
    return await axios.get("http://localhost:4000/todo/getdata")
  }

const handleclick = (e) => {
  e.preventDefault()
  if(input === ""){
    return alert("input empty")
  }else if(value !== ""){
    let obj = {id : id, to_do : input, description : descriptions}
    axios.put("http://localhost:4000/todo/update",obj)
    .then(() => {
      fetching()
      .then(res => settasks(res.data))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
    props.emptyS()
  }else{
    let obj = {to_do : input,description : descriptions}
    axios.post("http://localhost:4000/todo/postdata",obj)
    .then(data =>settasks(data.data))
    .catch(error => console.log(error))
    setInput("")
    setdescription("")
}

}

const cancelEdit = (e) => {
  e.preventDefault()
  props.emptyS()
  setInput("")
}

return(
<div>
  <div className="d-flex align-items-center justify-content-center">
    <form className="d-flex align-items-center justify-content-center flex-column gap-2" style={{marginTop:"100px"}}>
        <h2>Add Your List Here <FaAngellist className="peaceIcon"/></h2>
        <div className="d-flex">
          <input onChange={(e) => setInput(e.target.value) } className="input text-dark" type="text" value={input} placeholder="Add items..."/>
        </div>
          <textarea onChange={(e) => setdescription(e.target.value) } className="text-dark input" rows="2" cols="50" placeholder="Description..." value={descriptions}></textarea>
        <div className="d-flex">
          <button onClick={cancelEdit} className={`text-dark ${dnone} me-4 button`} style={{width:"100px"}}>cancel edit</button>
          <input className="button text-dark" type="submit" value="Add" onClick={handleclick}/>
        </div>
    </form>
  </div>
    <div>
        <Displaytodo task = {tasks}/>
    </div>
</div>

)
}

const mapStateToProps = (state) => {
  return{
    value : state.value,
    id : state.id,
    description : state.description

  }
}

const mapDispatchToStore = (dispatch) => {
  return {
    emptyS : () => dispatch(empty()),
  }
}

export default connect(mapStateToProps,mapDispatchToStore)(Todo)