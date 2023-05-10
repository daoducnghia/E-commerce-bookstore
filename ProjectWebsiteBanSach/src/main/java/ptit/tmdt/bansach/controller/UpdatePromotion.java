/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.controller;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.entity.PromotionDetailEntity;
import ptit.tmdt.bansach.entity.PromotionEntity;
import ptit.tmdt.bansach.repository.ProductRepository;
import ptit.tmdt.bansach.repository.PromotionDetailRepository;
import ptit.tmdt.bansach.repository.PromotionRepository;

/**
 *
 * @author dovan Cập nhật lại giá của mỗi sản phẩm vào lúc 0:00 mỗi ngày do
 * chương trình khuyến mãi hết hạn hoặc bắt đầu
 */
@Configuration
@EnableScheduling
public class UpdatePromotion {

    @Autowired
    PromotionRepository promotionRepository;

    @Autowired
    PromotionDetailRepository promotionDetailRepository;

    @Autowired
    ProductRepository productRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    public void updatePriceProduct() {
        Date today = new Date();
        List<ProductEntity> lProduct = (List<ProductEntity>) productRepository.findAll();
        for (ProductEntity p : lProduct) {
            float price = p.getOldPrice();
            List<PromotionDetailEntity> lProDe = promotionDetailRepository.findAllByProduct(p);
            for (PromotionDetailEntity prode : lProDe) {
                float priceT = p.getOldPrice();
                PromotionEntity pro = prode.getPromotion();
                if (today.compareTo(pro.getPromotionStartTime()) >= 0 && today.compareTo(pro.getPromotionEndTime()) <= 0) {
                    if (pro.getPromotionType().equalsIgnoreCase("vnd")) {
                        priceT = priceT - pro.getDiscount();
                    } else {
                        priceT = priceT - priceT * pro.getDiscount() / 100;
                    }
                    priceT = (float) (Math.ceil(priceT / 100) * 100);
                    if (priceT < price) {
                        price = priceT;
                    }
                }
            }
            p.setPrice(price);
            productRepository.save(p);
        }
    }
}
