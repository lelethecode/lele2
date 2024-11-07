export default function Home() {
  return (
    <div className="home-div">
      <div className="hello-txt">
        <h1 className="chao">Chào mừng đến với trang chính!</h1>
      </div>
      <div className="tutor-div">
        <h1 className="tutor-title">Hướng Dẫn</h1>
        <h2>Đăng Ký</h2>
        <ol>
          <li>Nhập tên người dùng</li>
          <li>Nhập mật khẩu </li>
          <li>Nhập thư điện tử </li>
          <li>Nhập mức độ vị giác</li>
        </ol>
        <h2> Đăng nhập</h2>    
        <ol>
          <li>Nhập tên người dùng</li>
          <li>Nhập mật khẩu</li>
        </ol>
        <h2>Truy cập phần chọn món</h2>
        <ul>
          <li>Sau khi đăng nhập thành công, hãy tìm phần "Chọn món ăn"</li>
        </ul>
        <h2>Chọn món ăn</h2>
        <ul>
          <li>Trong giao diện chọn món, bạn sẽ thấy danh sách các món ăn có sẵn.</li>
          <li>Nhấp chọn món bạn muốn đăng ký cho các ngày cụ thể</li>
          <li>Cuối cùng nhấn "Gởi" để gởi</li>
        </ul>
      </div>
    </div>
  );
}