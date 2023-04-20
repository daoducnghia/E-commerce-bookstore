package ptit.tmdt.bansach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ptit.tmdt.bansach.entity.AccountEntity;
import ptit.tmdt.bansach.repository.AccountRepository;

@CrossOrigin
@RequestMapping("/api")
@RestController
public class accountController {
    // @Autowired
    // AccountService accountService;

    @Autowired
    AccountRepository accountRepository;

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
}
