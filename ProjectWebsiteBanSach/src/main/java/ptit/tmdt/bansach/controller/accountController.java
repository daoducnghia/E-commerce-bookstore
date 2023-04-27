/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.controller;

import java.util.Enumeration;
import java.util.Random;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.AccountEntity;
import ptit.tmdt.bansach.repository.AccountRepository;

/**
 *
 * @author dovan
 */
@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/login")
    public Rule login(@RequestBody AccountEntity account, HttpSession session) {
        Enumeration<String> sessions = session.getAttributeNames();
        while (sessions.hasMoreElements()) {
        }
        Rule rule = new Rule();
        rule.setCode("401");
        rule.setMessage("Lỗi không thể đăng nhập!");
        try {
            AccountEntity accountEntity = accountRepository.findByUsername(account.getUsername());
            if (accountEntity == null) {
                rule.setMessage("Tên đăng nhập không chính xác!");
                return rule;
            }
            if (!accountEntity.getPassword().equals(account.getPassword())) {
                rule.setMessage("Mật khẩu không chính xác!");
                return rule;
            }
            String mes = randomCharecter();
            session.setAttribute(mes, accountEntity.getAccountId());
            rule.setCode("200");
            rule.setMessage(mes + ","+ accountEntity.getAccountType());
            return rule;
        } catch (Exception e) {
            System.out.println(e);
        }
        return rule;
    }

    private String randomCharecter() {
        String charecter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz";
        String mes = "";
        try {
            Random random = new Random();
            for (int i = 0; i < 20; i++) {
                int index = random.nextInt(charecter.length());
                char randomChar = charecter.charAt(index);
                mes += randomChar + "";
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return mes;
    }
}

class Rule {

    private String code;
    private String message;

    public Rule() {
    }

    public Rule(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
