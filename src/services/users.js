import axios from 'axios'
const userurl = '/api/users'

const getAll = async () => {
  const response = await axios.get(userurl)
  console.log(response.data)
  return response.data
}
export default { getAll }