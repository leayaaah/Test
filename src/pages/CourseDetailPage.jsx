import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { cartState } from '../store/atoms'
import { useFetch } from '../hooks/useFetch'
import { mockApi } from '../api/mockApi'

export default function CourseDetailPage() {
  // ============================================================
  // TODO (Câu 6 - React Router + Custom Hook useFetch):
  //
  // (a) Lấy id từ URL bằng useParams()
  //
  // (b) Gọi custom hook useFetch (sinh viên đã viết ở src/hooks/useFetch.js):
  //     const { data: course, loading, error } = useFetch(
  //       () => mockApi.getCourseById(id), [id]
  //     )
  //
  // (c) Khi click "Thêm vào giỏ":
  //     - setCart(prev => ...) để thêm course vào giỏ (giống logic câu 4)
  //     - navigate('/cart')  (dùng useNavigate)
  // ============================================================
  const { id } = useParams()
  const navigate = useNavigate()
  const setCart = useSetRecoilState(cartState)
  const { data: course, loading, error } = useFetch(
    () => mockApi.getCourseById(id),
    [id]
  )

  const handleAddToCart = () => {
    if (!course) return

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
    navigate('/cart')
  }

  if (loading) return <div className="loading">⏳ Đang tải...</div>
  if (error) return <div className="error-box">❌ {error}</div>
  if (!course) return null

  const formatPrice = (p) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)

  return (
    <div>
      <Link to="/courses" className="btn btn-outline btn-sm" style={{ marginBottom: 16 }}>
        ← Quay lại
      </Link>

      <div className="detail-wrap">
        <div className="detail-main">
          <img src={course.image} alt={course.title} />
          <h1>{course.title}</h1>
          <div className="detail-meta">
            <span className="badge badge-info">{course.level}</span>
            &nbsp;•&nbsp; 👨‍🏫 {course.instructor}
            &nbsp;•&nbsp; ⏱️ {course.duration}
            &nbsp;•&nbsp; 👥 {course.students} học viên
          </div>
          <p className="detail-description">{course.description}</p>
        </div>

        <div className="detail-side">
          <div className="price-big">{formatPrice(course.price)}</div>
          <button
            className="btn btn-success"
            style={{ width: '100%', marginBottom: 8 }}
            onClick={handleAddToCart}
          >
            🛒 Thêm vào giỏ hàng
          </button>
          <button className="btn btn-outline" style={{ width: '100%' }}>
            ❤️ Yêu thích
          </button>
        </div>
      </div>
    </div>
  )
}
