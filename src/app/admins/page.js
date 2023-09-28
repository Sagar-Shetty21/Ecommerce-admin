'use client'

import axios from 'axios';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';

const Admins = () => {
  useSession({required: true});

  const [allAdmins, setAllAdmins] = useState([])
  const [newAdminInput, setNewAdminInput] = useState("")

  const GetAllAdminsData = async() => {
    await axios.get('/api/admins').then(response => {
      setAllAdmins(response.data)
    })
  }
  useEffect(() => {
    GetAllAdminsData();
  },[])

  const handleAdminDelete = async(id) => {
    if(allAdmins.length > 1){
      await axios.delete('/api/admins?id=' + id).then(response => {
        alert("Admin deleted successfully!")
      })
      GetAllAdminsData();
    } else {
      alert("You cannot delete all admins!")
    }
  }

  const handleAddNewAdmin = async(e) => {
    e.preventDefault();
    await axios.post('/api/admins',{gmail: newAdminInput}).then(response => {
      alert("Admin added successfully")
    })
    GetAllAdminsData();
    setNewAdminInput("");
  }

  return (
    <div className="admins-management-page">
      <h2>Admins</h2>

      <label>Add new admin</label>
      <form onSubmit={handleAddNewAdmin}>
        <input type="email" required placeholder="google email" value={newAdminInput} onChange={(e) => setNewAdminInput(e.target.value)} />
        <button type="submit">Add admin</button>
      </form>

      <label>Existing admins</label>
      <div>
        <table>
          <thead>
            <tr>
              <th className="full-width-column">Admin google email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allAdmins.map(a => (
              <tr key={a._id}>
                <td className="full-width-column">{a.gmail}</td>
                <td>
                  <button onClick={() => handleAdminDelete(a._id)} className="product-delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admins