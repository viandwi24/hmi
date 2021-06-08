function safeUrl () {
  const baseurl = process.env.API_BASE_URL
  const prefix = process.env.API_PREFIX
  return baseurl + '/' + prefix
}

export default function ({ $axios }) {
  $axios.setBaseURL(safeUrl())
  $axios.interceptors.response.use(function (response) {
    console.log(response)
    return response
  }, function (error) {
    const res = error.response
    console.log(res)
    return Promise.reject(error)
  })
}
