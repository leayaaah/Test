import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
// import { useSetRecoilState } from 'recoil'
// import { cartState } from '../store/atoms'
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
  const courses = []         // <-- thay state thật vào
  const loading = false      // <-- thay state thật vào
  const error = null         // <-- thay state thật vào


  // ============================================================
  // TODO (Câu 2 - useState search & filter):
  // - Tạo state: keyword (search theo tên khóa học)
  // - Tạo state: levelFilter (lọc theo trình độ: '', 'Cơ bản', 'Trung bình', 'Nâng cao')
  // - Tạo state: sortBy (sắp xếp: '', 'price-asc', 'price-desc')
  // ============================================================
  const keyword = ''
  const levelFilter = ''
  const sortBy = ''


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
  const filteredCourses = courses // <-- thay bằng useMemo


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
  // const setCart = useSetRecoilState(cartState)
  const handleAddToCart = (course) => {
    // TODO
  }


  return (
    <div>
      <h1 className="page-title">Danh sách khóa học</h1>

      <div className="toolbar">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên khóa học..."
          value={keyword}
          onChange={() => {/* TODO: setKeyword */}}
        />
        <select value={levelFilter} onChange={() => {/* TODO: setLevelFilter */}}>
          <option value="">Tất cả trình độ</option>
          <option value="Cơ bản">Cơ bản</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Nâng cao">Nâng cao</option>
        </select>
        <select value={sortBy} onChange={() => {/* TODO: setSortBy */}}>
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
  return (
    <div className="course-card">
      {/* TODO: Hiển thị thông tin khóa học */}
      <img src={course?.image} alt={course?.title} />
      <div className="course-card-body">
        <span className="level">{/* TODO: course.level */}</span>
        <h3>{/* TODO: course.title */}</h3>
        <p className="instructor">👨‍🏫 {/* TODO: course.instructor */}</p>
        <p className="price">{/* TODO: định dạng giá VND */}</p>
      </div>
      <div className="course-card-footer">
        {/* TODO: 2 nút như mô tả trên */}
      </div>
    </div>
  )
}
