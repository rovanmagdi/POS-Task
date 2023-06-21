import axios from 'axios'
// console.log(process.env.REACT_APP_BACKED);

export default axios.create({
    baseURL:`https://example-data.draftbit.com`
})
