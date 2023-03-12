import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => {
      return res.data
    })
  }

const create = personObject => {
    const req = axios.post(baseUrl, personObject)
    return req.then(res => {
        return res.data
    })
}

const update = (id, personObject) => {
    console.log(`update ${id} ${personObject.name}`)
    const req = axios.put(`${baseUrl}/${id}`, personObject)
    return req.then(res => {
        return res.data
    })
}

const remove = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => {
        return res.data
    })
}

const exportObject = { getAll, create, update, remove }

export default exportObject