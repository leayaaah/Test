import { useEffect } from 'react'
// import { useRecoilState, useRecoilValue } from 'recoil'
// import { cartState, cartTotalState } from '../store/atoms'

export default function CartPage() {
  // ============================================================
  // TODO (Câu 8 - Recoil cho giỏ hàng):
  // - Dùng useRecoilState(cartState) để lấy [items, setItems]
  // - Cài đặt 3 hành động:
  //   + removeItem(id):           setItems(prev => prev.filter(...))
  //   + updateQuantity(id, q):    nếu q <= 0 -> xóa; ngược lại update item đó
  //   + clearAll():               setItems([])
  // ============================================================
  const items = []
  const setItems = () => {} // <-- thay bằng useRecoilState

  // ============================================================
  // TODO (Câu 9 - Recoil Selector):
  // Dùng useRecoilValue(cartTotalState) để lấy tổng tiền (selector đã viết ở atoms.js).
  // KHÔNG được tự dùng items.reduce() trong CartPage này.
  // ============================================================
  const total = 0 // <-- thay bằng useRecoilValue(cartTotalState)


  // ============================================================
  // TODO (Câu 10 - localStorage):
  // (a) Khi component mount: nếu localStorage có 'cart-items',
  //     đọc và setItems(parsed) để khôi phục giỏ hàng cũ.
  // (b) Mỗi khi `items` thay đổi -> localStorage.setItem('cart-items', JSON.stringify(items))
  //
  // Cả 2 đều dùng useEffect với dependencies phù hợp.
  // ============================================================

  const formatPrice = (p) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)

  return (
    <div>
      <h1 className="page-title">🛒 Giỏ hàng của bạn</h1>

      {items.length === 0 ? (
        <div className="empty">
          🛍️ Giỏ hàng đang trống
          <p style={{ marginTop: 8, fontSize: 14 }}>Hãy thêm khóa học vào giỏ nhé!</p>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Khóa học</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={item.image} alt={item.title} />
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td>{formatPrice(item.price)}</td>
                  <td>
                    <div className="qty-control">
                      <button onClick={() => {/* TODO: giảm số lượng */}}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => {/* TODO: tăng số lượng */}}>+</button>
                    </div>
                  </td>
                  <td><b>{formatPrice(item.price * item.quantity)}</b></td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {/* TODO: removeItem */}}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <button className="btn btn-outline" onClick={() => {/* TODO: clearAll */}}>
              🗑️ Xóa toàn bộ
            </button>
            <div>
              Tổng cộng: <span className="total">{formatPrice(total)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
