/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.controller;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.AccountEntity;
import ptit.tmdt.bansach.entity.BankCardEntity;
import ptit.tmdt.bansach.entity.UserEntity;
import ptit.tmdt.bansach.repository.AccountRepository;
import ptit.tmdt.bansach.repository.BankCardRepository;
import ptit.tmdt.bansach.repository.UserRepository;

/**
 *
 * @author dovan
 */
@CrossOrigin
@RequestMapping("/api")
@RestController
public class BankCardController {

    @Autowired
    BankCardRepository bankCardRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/get-bankcard-by-user")
    public List<BankCardDTO> getBankCardByUser(HttpServletRequest request) {
        try {
            String username = request.getHeader("user");
            AccountEntity acount = accountRepository.findByUsername(username);
            UserEntity user = userRepository.findByAccountId(acount.getAccountId());
            List<BankCardEntity> listCardE = bankCardRepository.findAllByUser(user);
            List<BankCardDTO> listCardDTO = new ArrayList<>();
            for (BankCardEntity c : listCardE) {
                BankCardDTO cardDTO = new BankCardDTO();
                cardDTO.setBankCardId(c.getBankCardId());
                cardDTO.setCardNumber(c.getCardNumber());
                listCardDTO.add(cardDTO);
            }
            return listCardDTO;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @PostMapping("/save-bankcard")
    public BankCardDTO saveBankCard(@RequestBody BankCardEntity bankCard, HttpServletRequest request) {
        try {
            String username = request.getHeader("user");
            AccountEntity acount = accountRepository.findByUsername(username);
            UserEntity user = userRepository.findByAccountId(acount.getAccountId());
            bankCard.setUser(user);
            BankCardEntity card = bankCardRepository.save(bankCard);
            BankCardDTO cardDTO = new BankCardDTO();
            cardDTO.setBankCardId(card.getBankCardId());
            cardDTO.setCardNumber(card.getCardNumber());
            return cardDTO;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new BankCardDTO();
    }
}

class BankCardDTO {

    private int bankCardId;

    public int getBankCardId() {
        return bankCardId;
    }

    public void setBankCardId(int bankCardId) {
        this.bankCardId = bankCardId;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    private String cardNumber;
};
