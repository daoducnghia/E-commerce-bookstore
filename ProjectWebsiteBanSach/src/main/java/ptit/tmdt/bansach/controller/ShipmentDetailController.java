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
import ptit.tmdt.bansach.entity.ShipmentDetailEntity;
import ptit.tmdt.bansach.entity.UserEntity;
import ptit.tmdt.bansach.repository.AccountRepository;
import ptit.tmdt.bansach.repository.ShipmentDetailRepository;
import ptit.tmdt.bansach.repository.UserRepository;

/**
 *
 * @author dovan
 */
@CrossOrigin
@RequestMapping("/api")
@RestController
public class ShipmentDetailController {
    @Autowired
    ShipmentDetailRepository shipmentDetailRepository;
    
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    UserRepository userRepository;
    
    @GetMapping("/get-all-shipment-detail-by-user")
    public List<ShipmentDetailEntity> getAllShipmentDetailByUser(HttpServletRequest request){
        try {
            String username = request.getHeader("user");
            AccountEntity acount = accountRepository.findByUsername(username);
            UserEntity user = userRepository.findByAccountId(acount.getAccountId());
            List<ShipmentDetailEntity> listShipmentDetail = shipmentDetailRepository.findAllByUser(user);
            return listShipmentDetail;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }
    
    @PostMapping("/save-shipment-detail")
    public ShipmentDetailEntity saveShipmentDetail(@RequestBody ShipmentDetailEntity shipmentDetail, HttpServletRequest request){
        try {
            String username = request.getHeader("user");
            AccountEntity acount = accountRepository.findByUsername(username);
            UserEntity user = userRepository.findByAccountId(acount.getAccountId());
            shipmentDetail.setUser(user);
            if(shipmentDetail.getStatus().equalsIgnoreCase("Mặc định")){
                List<ShipmentDetailEntity> listShipmentDetail = shipmentDetailRepository.findAllByUser(user);
                for(ShipmentDetailEntity smdte: listShipmentDetail){
                    smdte.setStatus("");
                    shipmentDetailRepository.save(smdte);
                }
            }
            ShipmentDetailEntity sd = shipmentDetailRepository.save(shipmentDetail);
            return sd;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ShipmentDetailEntity();
    }
}
