import { useState } from 'react'
// import { useRecoilState } from 'recoil'
// import { userState } from '../store/atoms'

export default function LoginPage() {
  // ============================================================
  // TODO (Câu 7 - Recoil cho User):
  // (a) Dùng useRecoilState với atom userState
  //     const [user, setUser] = useRecoilState(userState)
  //
  // (b) Khi user đã đăng nhập (user !== null):
  //     - Hiển thị "Xin chào, <username>!"
  //     - Hiển thị thời gian đăng nhập
  //     - Có nút "Đăng xuất" -> setUser(null)
  //
  // (c) Khi chưa đăng nhập:
  //     - Hiển thị form (đã có sẵn bên dưới)
  //     - Khi submit: nếu username và password không rỗng
  //       -> setUser({ username, loginTime: new Date().toLocaleString('vi-VN') })
  //       -> nếu rỗng: hiển thị lỗi
  // ============================================================

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const user = null // <-- thay bằng useRecoilState

  const handleLogin = (e) => {
    e.preventDefault()
    // TODO
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        {user ? (
          <div style={{ textAlign: 'center' }}>
            <h2>👋 Xin chào!</h2>
            {/* TODO: Hiển thị thông tin user và nút Đăng xuất */}
          </div>
        ) : (
          <>
            <h2>🔐 Đăng nhập</h2>
            <form onSubmit={handleLogin}>
              {error && <div className="error-box">{error}</div>}
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Đăng nhập
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
