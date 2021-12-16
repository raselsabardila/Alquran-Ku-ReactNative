import axios from "axios"

const Axios = axios.create({ baseURL: "https://api.quran.sutanlab.id" })

export default Axios