import axios from "axios"

const contactApi = axios.create({
  baseURL: "https://kakki-blog.microcms.io/api/v1",
  headers: {
    "Content-Type": "application/json",
    "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY,
  },
})

export default contactApi
