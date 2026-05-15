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
  // TODO: Sinh viên hoàn thiện
  return { data: null, loading: false, error: null }
}
