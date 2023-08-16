import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const UpdateJobPage = () => {
  const [name, setName] = useState("")
  const [bookname, setBookname] = useState("")
  const [isWriting, setIsWriting] = useState(false)
  const [status, setStatus] = useState("Pending")

  const { id } = useParams();
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/authors/${id}`, {name, bookname, isWriting, status})
      .then(response => {
        const author = response.data
        setName(author.name)
        setBookname(author.bookname)
        setStatus(author.status)
        setIsWriting(author.isWriting)
      })
      .catch(err => console.log(err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.patch(`http://localhost:8000/api/authors/${id}`, {status})
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

  const handleDelete = () =>{
    axios.delete(`http://localhost:8000/api/authors/${id}`)
    .then(response=> navigate(`/authors`))
    .catch(err=>console.log(err))

  }

  // console.log(status)

  return (
    <div>
      <h1 className="text-3xl font-bold">Favorite Authors</h1>
      <Link to="/authors" className='link link-success'>Home </Link>
      <h4>Add a New Author:</h4>

      <form onSubmit={handleSubmit}>
        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Name:</span>
          </label>
          <input type='text' className='input input-bordered' name="title" value={name} onChange={e => setName(e.target.value)}></input>
        </div>

        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Bookname:</span>
          </label>
          <input type='text' className='input input-bordered' name="title" value={bookname} onChange={e => setBookname(e.target.value)}></input>
        </div>

        <div className='form-control'>
          <label className='cursor-pointer label'>
            <span className='label-text'>Author is still Writing Book:</span>
          </label>
          <input type='checkbox' checked={isWriting} className="checkbox checkbox-accent" onChange={e => setIsWriting(e.target.checked)}></input>
        </div>

        <div>
          <select className="select select-warning w-full max-w-xs"  name="status" value={status} onChange={e => setStatus(e.target.value)}>
            <option value={"Pending"}>Pending</option>
            <option>I haven't started reading</option>
            <option>half ways through the book</option>
            <option>I finished reading</option>
            <option>I lost the book</option>
          </select>
        </div>

        <Link to="/authors" className="btn btn-active" type="cancel">Cancel</Link>
        <button className="btn btn-accent" type="submit">Submit</button>
        <button className="btn btn-secondary" type="button" onClick ={handleDelete}>Delete</button>

      </form>

      {
        errors.map((eachErr, idx) =>
          <p key={idx}> {eachErr}</p>)
      }

    </div>
  )
}

export default UpdateJobPage