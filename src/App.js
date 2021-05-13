import React, { useState, useEffect } from 'react'
import axios from 'axios'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')

  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [dish, setDish] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  const handleGrocerySubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'GET',
      url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
      params: { ingr: { dish } },
    }

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      //display alert
      showAlert(true, 'danger', 'Please enter value!')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Value changed')
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

  const clearList = () => {
    showAlert(true, 'danger', 'empty List')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item-removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className='section-center'>
      <form action='' className='grocery-form'>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3> Grocery Bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. Lasagna'
            value={dish}
            onChange={(e) => {
              setDish(e.target.value)
            }}
          />
          <button
            type='submit'
            className='submit-btn'
            onClick={handleGrocerySubmit}
          >
            Get Items
          </button>
        </div>
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
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
