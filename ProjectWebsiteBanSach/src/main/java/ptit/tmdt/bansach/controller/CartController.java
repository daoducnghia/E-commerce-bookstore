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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.AccountEntity;
import ptit.tmdt.bansach.entity.CardEntity;
import ptit.tmdt.bansach.entity.UserEntity;
import ptit.tmdt.bansach.repository.AccountRepository;
import ptit.tmdt.bansach.repository.CartRepository;
import ptit.tmdt.bansach.repository.UserRepository;

/**
 *
 * @author dovan
 */
@CrossOrigin
@RequestMapping("/api")
@RestController
public class CartController {
    @Autowired
    CartRepository cartRepository;
    
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    UserRepository userRepository;
    
    @GetMapping("/cart")
    public List<CardEntity> getCart(HttpServletRequest request){
        try {
            String username = request.getHeader("user");
            AccountEntity acount = accountRepository.findByUsername(username);
            UserEntity user = userRepository.findByAccountId(acount.getAccountId());
            List<CardEntity> listCart = cartRepository.findAllByUser(user);
            return listCart;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }
    
    @GetMapping("/get-cart-by-id")
    public CardEntity getCardById(@RequestParam("idCart") int idCart){
        try {
            CardEntity cart = cartRepository.findById(idCart).get();
            return cart;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new CardEntity();
    }
    
    @GetMapping("/get-number-product-in-cart")
    public int getNumberProductInCart(HttpServletRequest request){
        try {
            int nPC = 0;
            String username = request.getHeader("user");
            AccountEntity acount = accountRepository.findByUsername(username);
            UserEntity user = userRepository.findByAccountId(acount.getAccountId());
            List<CardEntity> listCart = cartRepository.findAllByUser(user);
            for(CardEntity c: listCart){
                nPC += c.getProductCount();
            }
            return nPC;
        } catch (Exception e) {
            System.out.println(e);
        }
        return 0;
    }
    
    @PostMapping("/update-cart")
    public CardEntity updateCart(@RequestBody CardEntity cardEntity){
        try {
            CardEntity cart = cartRepository.findById(cardEntity.getCardId()).get();
            cart.setProductCount(cardEntity.getProductCount());
            cart = cartRepository.save(cart);
            return cart;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new CardEntity();
    }
    
    @DeleteMapping("/delete-cart-by-id")
    public boolean deleteCartById(@RequestParam("idCart") int idCart){
        try {
            cartRepository.deleteById(idCart);
            return true;
            
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }
}
