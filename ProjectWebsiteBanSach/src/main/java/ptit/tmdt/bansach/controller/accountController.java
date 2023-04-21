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
public class accountController {
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
                System.out.println("Không tìm thấy tài khoản");
                return "Không tìm thấy tài khoản";
            }
            if (account1.getPassword().equals(account1.getPassword())) {
                System.out.println("Đăng nhập thành công");
                return "Đăng nhập thành công";
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

            System.out.println(nguoiDung.getUsername());
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
                return "Trùng username";
            }
            // userRepository.saveNguoiDung(nguoiDung.getName(), nguoiDung.getEmail(),
            // nguoiDung.getPhoneNumber());
            return "Lưu tài khoản thành công";
        } catch (Exception e) {
            // TODO: handle exception
        }
        return "khong lam gi";
    }
}

class NguoiDung {

    private String name;
    private String email;
    private String phoneNumber;
    private String username;
    private String password;

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

}
