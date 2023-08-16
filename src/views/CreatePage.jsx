import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const CreatePage = () => {
  const [name, setName] = useState("")
  const [bookname, setBookname] = useState("")
  const [isWriting, setIsWriting] = useState(false)

  const navigate = useNavigate()

  const [errors, setErrors] = useState([])

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post(`http://localhost:8000/api/authors`, {name, bookname, isWriting, status:"Pending"})

    .then(response => {
      navigate(`/authors`)
    })
    .catch(err=>{
      const errResponse = err.response.data.errors

      const errArr = []
      for (const eachKey in errResponse){
        errArr.push(errResponse[eachKey].message)
      }
      setErrors(errArr)
    })
  }


  return (
    <div>
      <h1>Favorite Authors</h1>
      <Link to="/authors" className='link link-success'>Home </Link>
      <h4>Add a New Author:</h4>

      <form onSubmit={handleSubmit}>
        <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Name:</span>
            </label>
            <input type='text' className='input input-bordered' name="title" value={name} onChange={e=>setName(e.target.value)}></input>
        </div>

        <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Bookname:</span>
            </label>
            <input type='text' className='input input-bordered' name="title" value={bookname} onChange={e=>setBookname(e.target.value)}></input>
        </div>

        <div className='form-control'>
            <label className='cursor-pointer label'>
              <span className='label-text'>Author is still Writing Book:</span>
            </label>
            <input type='checkbox' checked={isWriting} className="checkbox checkbox-accent" onChange={e=>setIsWriting(e.target.checked)}></input>
        </div>

        <Link to="/authors" className="btn btn-active" type="cancel">Cancel</Link>
        <button className="btn btn-accent" type="submit">Submit</button>

      </form>

      {
        errors.map((eachErr, idx) =>
        <p key={idx}> {eachErr}</p> )
      }

    </div>
  )
}

export default CreatePage