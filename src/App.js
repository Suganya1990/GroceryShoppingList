import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      //display alert
      showAlert(true, 'danger', 'Please enter value!')
    } else if (name && isEditing) {
      //deal with edit
    } else {
      //show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (
    show = false,
    type = 'danger',
    msg = 'Please enter value'
  ) => {
    setAlert({ show, type, msg })
  }
  const clearAlert = () => {
    showAlert(true, 'danger', 'empty list')
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty List')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item-removed')
    setList(list.filter((item) => item.id !== id))
  }
  return (
    <section className='section-center'>
      <form action='' className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3> Grocery Bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} />
          <button className='clear-btn' onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  )
}

export default App