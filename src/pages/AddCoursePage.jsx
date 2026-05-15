import { useReducer, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockApi } from '../api/mockApi'

// ============================================================
// TODO (Câu 11 - useReducer):
// Sử dụng useReducer để quản lý state form thêm khóa học
//
// initialState = {
//   title: '', instructor: '', price: '', level: 'Cơ bản', description: '',
//   errors: {},
//   submitting: false
// }
//
// Các action cần xử lý:
//   - { type: 'CHANGE_FIELD', field, value }     -> cập nhật field tương ứng
//   - { type: 'SET_ERRORS', errors }              -> gán errors
//   - { type: 'SUBMIT_START' }                    -> submitting = true, errors = {}
//   - { type: 'SUBMIT_SUCCESS' }                  -> reset form về initialState
//   - { type: 'SUBMIT_FAIL' }                     -> submitting = false
//
// Validate khi submit:
//   - title không được rỗng        => errors.title = 'Tên khóa học không được rỗng'
//   - instructor không được rỗng    => errors.instructor = 'Vui lòng nhập tên giảng viên'
//   - price phải là số > 0          => errors.price = 'Giá phải lớn hơn 0'
// Nếu có lỗi -> dispatch SET_ERRORS, không submit
// Nếu hợp lệ -> gọi mockApi.createCourse(...) rồi navigate('/courses')
// ============================================================

const initialState = {
  title: '',
  instructor: '',
  price: '',
  level: 'Cơ bản',
  description: '',
  errors: {},
  submitting: false
}

function formReducer(state, action) {
  // TODO: Sinh viên hoàn thiện reducer
  switch (action.type) {
    default:
      return state
  }
}

export default function AddCoursePage() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const navigate = useNavigate()

  // ============================================================
  // TODO (Câu 12 - useRef):
  // Tạo ref `titleInputRef` gắn vào input "Tên khóa học"
  // Khi submit có lỗi ở field title -> focus vào input đó (titleInputRef.current.focus())
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO:
    // 1. Validate dữ liệu
    // 2. Nếu lỗi: dispatch SET_ERRORS + focus vào input lỗi đầu tiên (dùng useRef)
    // 3. Nếu OK: dispatch SUBMIT_START -> gọi mockApi.createCourse({...}) -> dispatch SUBMIT_SUCCESS -> alert -> navigate('/courses')
  }

  return (
    <div>
      <h1 className="page-title">➕ Thêm khóa học mới</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên khóa học *</label>
          <input
            type="text"
            value={state.title}
            onChange={() => {/* TODO: dispatch CHANGE_FIELD */}}
            placeholder="VD: ReactJS từ cơ bản"
          />
          {state.errors.title && <div className="error">{state.errors.title}</div>}
        </div>

        <div className="form-group">
          <label>Giảng viên *</label>
          <input
            type="text"
            value={state.instructor}
            onChange={() => {/* TODO */}}
            placeholder="VD: Nguyễn Văn A"
          />
          {state.errors.instructor && <div className="error">{state.errors.instructor}</div>}
        </div>

        <div className="form-group">
          <label>Giá (VNĐ) *</label>
          <input
            type="number"
            value={state.price}
            onChange={() => {/* TODO */}}
            placeholder="VD: 500000"
          />
          {state.errors.price && <div className="error">{state.errors.price}</div>}
        </div>

        <div className="form-group">
          <label>Trình độ</label>
          <select value={state.level} onChange={() => {/* TODO */}}>
            <option value="Cơ bản">Cơ bản</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Nâng cao">Nâng cao</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            rows={4}
            value={state.description}
            onChange={() => {/* TODO */}}
            placeholder="Mô tả khóa học..."
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/courses')}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={state.submitting}
          >
            {state.submitting ? 'Đang lưu...' : 'Lưu khóa học'}
          </button>
        </div>
      </form>
    </div>
  )
}
