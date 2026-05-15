import { useState, useEffect } from 'react'

// ============================================================
// TODO (Câu 6 - Custom Hook):
// Viết custom hook `useFetch` nhận:
//   - asyncFn: hàm async trả về { data: ... }
//   - deps: mảng dependencies (giống như useEffect)
//
// Trả về: { data, loading, error }
//
// Hành vi:
// - Khi component mount hoặc deps thay đổi:
//   + Set loading = true, error = null
//   + Gọi asyncFn(), nhận response, set data = response.data
//   + Nếu lỗi: set error = err.message
//   + Cuối cùng set loading = false
//
// Gợi ý: dùng useState cho data/loading/error,
//        useEffect với deps để chạy lại khi deps thay đổi.
// ============================================================

export function useFetch(asyncFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await asyncFn()
        if (active) setData(response.data)
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchData()

    return () => {
      active = false
    }
  }, deps)

  return { data, loading, error }
}
