package ptit.tmdt.bansach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ptit.tmdt.bansach.entity.AccountEntity;
import ptit.tmdt.bansach.entity.UserEntity;
import ptit.tmdt.bansach.repository.AccountRepository;
import ptit.tmdt.bansach.repository.UserRepository;

@CrossOrigin
@RequestMapping("/api")
@RestController
public class AccountController {
    // @Autowired
    // AccountService accountService;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/dangnhap")
    public String dangNhap(@RequestBody AccountEntity account) {
        try {
            AccountEntity account1 = accountRepository.findByUsername(account.getUsername());

            if (account1 == null) {
                // System.out.println("Không tìm thấy tài khoản");
                return "Không tìm thấy tài khoản";
            }
            if (account1.getPassword().equals(account1.getPassword())) {
                // System.out.println("Đăng nhập thành công");
                return account.getUsername() + account1.getAccountType();
            }

        } catch (Exception e) {
            // TODO: handle exception
        }
        return "Khong lam gi";
    }

    @GetMapping("/home")
    public String home() {
        return null;
    }

    @PostMapping("/dangky")
    public String dangKy(@RequestBody NguoiDung nguoiDung) {
        try {

            // System.out.println(nguoiDung.getUsername());
            AccountEntity account_check = accountRepository.findByUsername(
                    nguoiDung.getUsername());
            AccountEntity account_save = new AccountEntity();
            UserEntity user_save = new UserEntity();
            // System.out.println(account_check.getUsername());
            if (account_check == null) {
                account_save.setUsername(nguoiDung.getUsername());
                account_save.setPassword(nguoiDung.getPassword());
                account_save.setAccountType("user");
                accountRepository.save(account_save);

                user_save.setName(nguoiDung.getName());
                user_save.setEmail(nguoiDung.getEmail());
                user_save.setPhoneNumber(nguoiDung.getPhoneNumber());
                user_save.setAccount(account_save);
                userRepository.save(user_save);
                return "Đăng ký thành công";
            } else if (nguoiDung.getUsername().equals(account_check.getUsername())) {
                return "Tài khoản đã tồn tại";
            }
            // userRepository.saveNguoiDung(nguoiDung.getName(), nguoiDung.getEmail(),
            // nguoiDung.getPhoneNumber());
            return "Lưu tài khoản thành công";
        } catch (Exception e) {
            // TODO: handle exception
        }
        return "khong lam gi";
    }

    @PostMapping("/quanLyThongTinCaNhan")
    public NguoiDung showQuanLyTT(@RequestBody NguoiDung nguoiDung) {
        try {
            NguoiDung nguoiDung2 = new NguoiDung();

            AccountEntity account_check = accountRepository.findByUsername(
                    nguoiDung.getUsername());
            if (account_check != null) {
                UserEntity user_check = userRepository.findByAccountId(account_check.getAccountId());
                if (user_check != null) {
                    nguoiDung2.setName(user_check.getName());
                    nguoiDung2.setEmail(user_check.getEmail());
                    nguoiDung2.setPhoneNumber(user_check.getPhoneNumber());
                    nguoiDung2.setUsername(account_check.getUsername());
                    nguoiDung2.setPassword(account_check.getPassword());

                    return nguoiDung2;
                } else {
                    return null;
                }
            } else {
                return null;
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @PostMapping("/saveTTCN")
    public String saveQuanLyTT(@RequestBody NguoiDung nguoiDung) {
        try {
            AccountEntity account_check = accountRepository.findByUsername(
                    nguoiDung.getUsername());
            UserEntity user_check = userRepository.findByAccountId(account_check.getAccountId());

            account_check.setPassword(nguoiDung.getPassword());
            account_check.setAccountType("user");
            accountRepository.save(account_check);

            user_check.setName(nguoiDung.getName());
            user_check.setEmail(nguoiDung.getEmail());
            user_check.setPhoneNumber(nguoiDung.getPhoneNumber());
            user_check.setAccount(account_check);
            userRepository.save(user_check);

            return "Lưu thông tin thành công";

        } catch (

        Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return "Khong";
    }

    @PostMapping("/quenMK-check")
    public String quenmkCheck(@RequestBody NguoiDung nguoiDung) {
        try {
            // Check username
            AccountEntity ae = accountRepository.findByUsernameCorrect(nguoiDung.getUsername());
            if (ae == null) {
                return "Username không có trong CSDL";
            }
            // Check email, phongNumber
            UserEntity ue = userRepository.findByAccountId(ae.getAccountId());
            if (!ue.getEmail().equals(nguoiDung.getEmail())) {
                return "Sai email";
            } else if (!ue.getPhoneNumber().equals(nguoiDung.getPhoneNumber())) {
                return "Sai số điện thoại";
            } else if (ue.getEmail().equals(nguoiDung.getEmail()) && ue.getPhoneNumber()
                    .equals(nguoiDung.getPhoneNumber())) {
                return "Cho qua account_id = " + ae.getAccountId();
            }
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return "Không làm gì";
    }

    @PostMapping("/quenMK-save")
    public String quenMKSave(@RequestBody NguoiDung nguoiDung) {
        try {
            AccountEntity ae = accountRepository.findByAccountId(nguoiDung.getId());
            if (ae == null) {
                return "Không tìm thấy account";
            }
            if (nguoiDung.getPassword().equals(ae.getPassword())) {
                return "MK mới trùng MK cũ";
            }
            ae.setPassword(nguoiDung.getPassword());
            accountRepository.save(ae);
            return "Đổi mật khẩu thành công";
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return "Không làm gì";
    }
}

class NguoiDung {
    private int id;
    private String name;
    private String email;
    private String phoneNumber;
    private String username;
    private String password;

    public NguoiDung() {
    }

    public NguoiDung(String name, String email, String phoneNumber, String username, String password) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}
