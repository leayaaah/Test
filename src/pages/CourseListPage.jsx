import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { cartState } from '../store/atoms'
import { mockApi } from '../api/mockApi'

export default function CourseListPage() {
  // ============================================================
  // TODO (Câu 1 - useState + useEffect + Fetch API):
  // - Tạo state: courses (mảng), loading (boolean), error (string|null)
  // - Dùng useEffect để gọi mockApi.getCourses() khi component mount
  // - Khi đang gọi API: hiển thị <div className="loading">Đang tải...</div>
  // - Nếu có lỗi: hiển thị <div className="error-box">{error}</div>
  // - Khi xong: lưu danh sách vào state courses
  // ============================================================
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    const fetchCourses = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await mockApi.getCourses()
        if (active) setCourses(response.data)
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchCourses()

    return () => {
      active = false
    }
  }, [])


  // ============================================================
  // TODO (Câu 2 - useState search & filter):
  // - Tạo state: keyword (search theo tên khóa học)
  // - Tạo state: levelFilter (lọc theo trình độ: '', 'Cơ bản', 'Trung bình', 'Nâng cao')
  // - Tạo state: sortBy (sắp xếp: '', 'price-asc', 'price-desc')
  // ============================================================
  const [keyword, setKeyword] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [sortBy, setSortBy] = useState('')


  // ============================================================
  // TODO (Câu 3 - useMemo):
  // Sử dụng useMemo để tính danh sách khóa học hiển thị (filteredCourses)
  // Yêu cầu lọc theo:
  //   - Tên khóa học (title) chứa keyword (không phân biệt hoa thường)
  //   - Đúng level nếu levelFilter khác rỗng
  // Sau đó sắp xếp theo:
  //   - sortBy === 'price-asc'  => giá tăng dần
  //   - sortBy === 'price-desc' => giá giảm dần
  // useMemo phải có dependencies đúng để chỉ tính lại khi cần thiết
  // ============================================================
  const filteredCourses = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    const filtered = courses.filter(course => {
      const matchedKeyword = course.title.toLowerCase().includes(normalizedKeyword)
      const matchedLevel = !levelFilter || course.level === levelFilter
      return matchedKeyword && matchedLevel
    })

    if (sortBy === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price)
    }
    if (sortBy === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price)
    }
    return filtered
  }, [courses, keyword, levelFilter, sortBy])


  // ============================================================
  // TODO (Câu 4 - useCallback + Recoil):
  // Viết hàm handleAddToCart(course) dùng useCallback
  // - Dùng useSetRecoilState(cartState) để lấy hàm setCart
  // - Logic:
  //     + Nếu course đã tồn tại trong cart -> tăng quantity lên 1
  //     + Nếu chưa có -> thêm mới với quantity = 1
  // - Sau đó alert("Đã thêm vào giỏ hàng!")
  // Truyền hàm này xuống mỗi CourseCard qua prop onAddToCart
  // ============================================================
  const setCart = useSetRecoilState(cartState)
  const handleAddToCart = useCallback((course) => {
    setCart(prev => {
      const found = prev.find(item => item.id === course.id)

      if (found) {
        return prev.map(item =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prev,
        {
          id: course.id,
          title: course.title,
          price: course.price,
          image: course.image,
          quantity: 1
        }
      ]
    })
    alert('Đã thêm vào giỏ hàng!')
  }, [setCart])


  return (
    <div>
      <h1 className="page-title">Danh sách khóa học</h1>

      <div className="toolbar">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên khóa học..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="">Tất cả trình độ</option>
          <option value="Cơ bản">Cơ bản</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Nâng cao">Nâng cao</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Mặc định</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
        <div className="spacer" />
        <span style={{ color: '#6b7280', fontSize: 14 }}>
          Hiển thị: <b>{filteredCourses.length}</b> / {courses.length} khóa học
        </span>
      </div>

      {loading && <div className="loading">⏳ Đang tải dữ liệu...</div>}
      {error && <div className="error-box">❌ {error}</div>}

      {!loading && !error && filteredCourses.length === 0 && (
        <div className="empty">😔 Không có khóa học nào phù hợp</div>
      )}

      <div className="course-grid">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

// =============================================================
// TODO (Câu 5 - Component & Props):
// Hoàn thiện component CourseCard
// - Nhận props: course (object), onAddToCart (function)
// - Hiển thị: hình ảnh, tên, giảng viên, level, giá (định dạng VND)
// - Có 2 nút: "Xem chi tiết" (Link tới /courses/:id) và "Thêm vào giỏ" (gọi onAddToCart)
//
// Gợi ý format tiền VND:
// new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
// =============================================================
function CourseCard({ course, onAddToCart }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <div className="course-card-body">
        <span className="level">{course.level}</span>
        <h3>{course.title}</h3>
        <p className="instructor">👨‍🏫 {course.instructor}</p>
        <p className="price">{formatPrice(course.price)}</p>
      </div>
      <div className="course-card-footer">
        <Link className="btn btn-outline btn-sm" to={`/courses/${course.id}`}>
          Xem chi tiết
        </Link>
        <button className="btn btn-primary btn-sm" onClick={() => onAddToCart(course)}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  )
}
