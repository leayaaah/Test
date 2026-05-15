import { atom, selector } from 'recoil'

// ============================================================
// TODO (Câu 7 - Recoil cho User):
// Tạo atom `userState` để lưu thông tin user đăng nhập (global state)
//
// State có 2 trạng thái:
// - Khi chưa đăng nhập: null
// - Khi đã đăng nhập: { username: 'xxx', loginTime: '...' }
//
// Yêu cầu:
// - Atom `userState` với key duy nhất, default = null
// - Khi user đăng nhập thành công ở LoginPage -> set atom này
// - Trong LoginPage hiển thị thông tin user và nút "Đăng xuất" nếu đã login
// ============================================================

export const userState = atom({
  key: 'userState',
  default: null
})


// ============================================================
// TODO (Câu 8 - Recoil cho Cart - giỏ hàng global):
// Tạo atom `cartState` lưu danh sách item trong giỏ hàng
//
// Cấu trúc: mảng các item, mỗi item có dạng:
//   { id, title, price, image, quantity }
//
// Yêu cầu:
// - Atom `cartState` với key duy nhất, default = []
// - Sử dụng atom này trong CourseListPage, CourseDetailPage, CartPage và App.jsx (badge giỏ hàng)
// ============================================================

export const cartState = atom({
  key: 'cartState',
  default: []
})


// ============================================================
// TODO (Câu 9 - Recoil Selector):
// Tạo selector `cartTotalState` để TỰ ĐỘNG tính tổng tiền giỏ hàng
//
// Yêu cầu:
// - Selector tên `cartTotalState`, key duy nhất
// - get: nhận cartState, trả về tổng (price * quantity) của tất cả item
// - Trong CartPage, dùng useRecoilValue(cartTotalState) để hiển thị tổng tiền
// - Ưu điểm: không cần tự tính tay trong component, mọi nơi đọc đều luôn đồng bộ
//
// Gợi ý:
// export const cartTotalState = selector({
//   key: 'cartTotalState',
//   get: ({ get }) => {
//     const items = get(cartState)
//     return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
//   }
// })
// ============================================================

// TODO: Sinh viên viết selector cartTotalState ở đây
