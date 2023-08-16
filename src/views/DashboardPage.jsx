import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [authorList, setAuthorList] = useState([])

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/authors`)
    .then(response => setAuthorList(response.data))
    .catch(err=> console.log(err))
  }, [])

  const handleDelete = (deleteId) => {
    axios.delete(`http://localhost:8000/api/authors/${deleteId}`)
    .then(response => {
      removeFromDom(deleteId)
    })
    .catch(err=> console.log(err))
  }

  const removeFromDom = (deleteId) => {
    const filteredList = authorList.filter((eachAuthor) => eachAuthor._id !== deleteId )
    setAuthorList(filteredList)
}



  return (
    <div>
      <h1 className="text-3xl font-bold">Favorite Authors</h1>
      <Link to="/authors/new" className='link link-success'>Add an Author </Link>
      <h4>We have quotes by:</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Author</th>
            <th>BookName</th>
            <th>Finished Book?</th>
            <th>Actions Available</th>
          </tr>
        </thead>
        <tbody>
          {
            authorList.map((eachAuthor) =>(
              <tr key = {eachAuthor._id} className='hover'>
                <td><Link to={`/authors/${eachAuthor._id}`} className='link'>{eachAuthor.name}</Link>   {eachAuthor.isWriting&& "(Currently Writing)"} </td>
                <td>{eachAuthor.bookname}</td>
                <td>{eachAuthor.status}</td>
                <td><Link to={`/authors/${eachAuthor._id}/edit`} className='link'>Edit</Link></td>
                <td><button onClick={()=>handleDelete(eachAuthor._id)}>Delete</button></td>
              </tr>
            )
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default DashboardPage