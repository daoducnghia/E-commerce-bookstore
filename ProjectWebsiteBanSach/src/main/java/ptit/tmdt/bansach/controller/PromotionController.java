/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.entity.PromotionDetailEntity;
import ptit.tmdt.bansach.entity.PromotionEntity;
import ptit.tmdt.bansach.repository.ProductRepository;
import ptit.tmdt.bansach.repository.PromotionDetailRepository;
import ptit.tmdt.bansach.repository.PromotionRepository;

/**
 *
 * @author dovan
 */
@CrossOrigin
@RestController
@RequestMapping("/api")
public class PromotionController {

    @Autowired
    PromotionRepository promotionRepository;

    @Autowired
    PromotionDetailRepository promotionDetailRepository;

    @Autowired
    ProductRepository productRepository;

    @PostMapping("/add-promotion")
    public String addPromotion(@RequestBody Promotion promotion) {
        try {
            PromotionEntity pe = new PromotionEntity();
            if (promotion.getPromotion().getPromotionId() == 0) {
                pe = promotionRepository.save(promotion.getPromotion());
            } else {
                PromotionEntity pe1 = promotionRepository.findById(promotion.getPromotion().getPromotionId()).get();
                PromotionEntity pe2 = promotion.getPromotion();
                if (pe2.getLinkImage().isEmpty()) {
                    pe2.setLinkImage(pe1.getLinkImage());
                }
                pe = promotionRepository.save(pe2);
                List<PromotionDetailEntity> lPromotionDetail = promotionDetailRepository.findAllByPromotion(pe);
                List<ProductEntity> lProduct = new ArrayList<>();
                //Xoá các promotion detail
                for (PromotionDetailEntity pde : lPromotionDetail) {
                    lProduct.add(pde.getProduct());
                    promotionDetailRepository.delete(pde);
                }
                //Cập nhật lại giá sale của sản phẩm nếu khuyến mãi bị xoá đang hoạt đông
                Date today = new Date();
                if (today.compareTo(pe.getPromotionStartTime()) >= 0 && today.compareTo(pe.getPromotionEndTime()) <= 0) {
                    for (ProductEntity p : lProduct) {
                        float price = p.getOldPrice();
                        List<PromotionDetailEntity> lProDe = promotionDetailRepository.findAllByProduct(p);
                        for (PromotionDetailEntity prode : lProDe) {
                            float priceT = p.getOldPrice();
                            PromotionEntity pro1 = prode.getPromotion();
                            if (today.compareTo(pro1.getPromotionStartTime()) >= 0 && today.compareTo(pro1.getPromotionEndTime()) <= 0) {
                                if (pro1.getPromotionType().equalsIgnoreCase("vnd")) {
                                    priceT = priceT - pro1.getDiscount();
                                } else {
                                    priceT = priceT - priceT * pro1.getDiscount() / 100;
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
            List<ProductEntity> products = new ArrayList<>();
            if (promotion.getStatusPromotion() != null && promotion.getStatusPromotion().equalsIgnoreCase("all")) {
                products = (List<ProductEntity>) productRepository.findAll();
            } else {
                products = (List<ProductEntity>) productRepository.findAllById(promotion.getlProduct());
            }
            boolean check = false;
            Date today = new Date();
            if (today.compareTo(pe.getPromotionStartTime()) >= 0 && today.compareTo(pe.getPromotionEndTime()) <= 0) {
                check = true;
            }
            for (ProductEntity p : products) {
                PromotionDetailEntity pde = new PromotionDetailEntity();
                pde.setProduct(p);
                pde.setPromotion(pe);
                promotionDetailRepository.save(pde);
                if (check) {
                    float price = p.getOldPrice();
                    if (pe.getPromotionType().equalsIgnoreCase("vnd")) {
                        price = price - pe.getDiscount();
                    } else {
                        price = price - price * pe.getDiscount() / 100;
                    }
                    price = (float) (Math.ceil(price / 100) * 100);
                    if (price < p.getPrice()) {
                        p.setPrice(price);
                        productRepository.save(p);
                    }
                }
            }

            return "OK";
        } catch (Exception e) {
            System.out.println(e);
        }
        return "ERROR";
    }

    @GetMapping("/get-promotion-by-id")
    public Promotion getPrommotionById(@RequestParam("id") int id) {
        try {
            Promotion p = new Promotion();
            p.setPromotion(promotionRepository.findById(id).get());
            List<PromotionDetailEntity> lpd = promotionDetailRepository.findAllByPromotion(p.getPromotion());
            List<Integer> lIdProduct = new ArrayList<>();
            for (PromotionDetailEntity pd : lpd) {
                lIdProduct.add(pd.getProduct().getProductId());
            }
            p.setlProduct(lIdProduct);
            return p;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new Promotion();
    }
    
    @GetMapping("/get-all-promotion-active")
    public List<PromotionEntity> getAllPromotionActive(){
        try {
            Date today = new Date();
            List<PromotionEntity> list = (List<PromotionEntity>) promotionRepository.findAll();
            List<PromotionEntity> listActive = new ArrayList<>();
            for(PromotionEntity p: list){
                if(today.compareTo(p.getPromotionStartTime()) >= 0 && today.compareTo(p.getPromotionEndTime()) <= 0){
                    listActive.add(p);
                }
            }
            return listActive;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @GetMapping("/get-all-promotion")
    public List<PromotionEntity> getAllPromotion() {
        try {
            List<PromotionEntity> list = (List<PromotionEntity>) promotionRepository.findAll();
            list.sort(Comparator.comparing(PromotionEntity::getPromotionStartTime).reversed());
            return list;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @GetMapping("/get-all-promotion-by-name")
    public List<PromotionEntity> getAllPromotionByName(@RequestParam("promotion-name") String promotionName) {
        try {
            List<PromotionEntity> list = promotionRepository.findAllByName("%" + promotionName + "%");
            return list;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @DeleteMapping("/del-promotion")
    public String deletePromotion(@RequestParam("id-promotion") int idPromotion) {
        try {
            PromotionEntity pro = promotionRepository.findById(idPromotion).get();
            List<PromotionDetailEntity> lPromotionDetail = promotionDetailRepository.findAllByPromotion(pro);
            List<ProductEntity> lProduct = new ArrayList<>();
            //Xoá các promotion detail
            for (PromotionDetailEntity pde : lPromotionDetail) {
                lProduct.add(pde.getProduct());
                promotionDetailRepository.delete(pde);
            }
            //Cập nhật lại giá sale của sản phẩm nếu khuyến mãi bị xoá đang hoạt đông
            Date today = new Date();
            if (today.compareTo(pro.getPromotionStartTime()) >= 0 && today.compareTo(pro.getPromotionEndTime()) <= 0) {
                for (ProductEntity p : lProduct) {
                    float price = p.getOldPrice();
                    List<PromotionDetailEntity> lProDe = promotionDetailRepository.findAllByProduct(p);
                    for (PromotionDetailEntity prode : lProDe) {
                        float priceT = p.getOldPrice();
                        PromotionEntity pro1 = prode.getPromotion();
                        if (today.compareTo(pro1.getPromotionStartTime()) >= 0 && today.compareTo(pro1.getPromotionEndTime()) <= 0) {
                            if (pro1.getPromotionType().equalsIgnoreCase("vnd")) {
                                priceT = priceT - pro1.getDiscount();
                            } else {
                                priceT = priceT - priceT * pro1.getDiscount() / 100;
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
            promotionRepository.delete(pro);
            return "OK";
        } catch (Exception e) {
            System.out.println(e);
        }
        return "ERROR";
    }
    
    @GetMapping("/get-all-product-by-promotion")
    public List<ProductEntity> getAllProductByPromotion(@RequestParam("promotion") int id){
        try {
            PromotionEntity promotion = promotionRepository.findById(id).get();
            List<PromotionDetailEntity> listPromotionDetail = promotionDetailRepository.findAllByPromotion(promotion);
            List<ProductEntity> listProduct = new ArrayList<>();
            for(PromotionDetailEntity pde: listPromotionDetail){
                listProduct.add(pde.getProduct());
            }
            return listProduct;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }
}

class Promotion {

    private PromotionEntity promotion;
    private List<Integer> lProduct;
    private String statusPromotion;

    public PromotionEntity getPromotion() {
        return promotion;
    }

    public void setPromotion(PromotionEntity promotion) {
        this.promotion = promotion;
    }

    public List<Integer> getlProduct() {
        return lProduct;
    }

    public void setlProduct(List<Integer> lProduct) {
        this.lProduct = lProduct;
    }

    public String getStatusPromotion() {
        return statusPromotion;
    }

    public void setStatusPromotion(String statusPromotion) {
        this.statusPromotion = statusPromotion;
    }
};
