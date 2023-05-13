/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ptit.tmdt.bansach.controller;

import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.AccountEntity;
import ptit.tmdt.bansach.entity.OrderEntity;
import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.entity.ReviewEntity;
import ptit.tmdt.bansach.entity.UserEntity;
import ptit.tmdt.bansach.repository.AccountRepository;
import ptit.tmdt.bansach.repository.OrderRepository;
import ptit.tmdt.bansach.repository.ProductRepository;
import ptit.tmdt.bansach.repository.ReviewRepository;
import ptit.tmdt.bansach.repository.UserRepository;

/**
 *
 * @author dovan
 */
@CrossOrigin
@RequestMapping("/api")
@RestController
public class ReviewController {

    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;

    @PostMapping("/save-review")
    public String saveReview(HttpServletRequest request, @RequestBody Review review) {
        try {
            String username = request.getHeader("user");
            AccountEntity acount = accountRepository.findByUsername(username);
            UserEntity user = userRepository.findByAccountId(acount.getAccountId());
            Date date = new Date();
            for (ReviewEntity re : review.getListReview()) {
                re.setReviewDate(date);
                re.setUser(user);
                ProductEntity product = productRepository.findById(re.getProduct().getProductId()).get();
                re.setProduct(product);
                reviewRepository.save(re);
                product.setPoint((product.getPoint() * product.getNumberReview() + re.getPoint()) / (product.getNumberReview() + 1));
                product.setNumberReview(product.getNumberReview() + 1);
                productRepository.save(product);
            }
            OrderEntity or = orderRepository.findById(review.getOrder().getOrderId()).get();
            or.setOrderStatus("Đã đánh giá");
            orderRepository.save(or);
            return "OK";
        } catch (Exception e) {
            System.out.println(e);
        }
        return "ERROR";
    }
}

class Review {

    public List<ReviewEntity> getListReview() {
        return listReview;
    }

    public void setListReview(List<ReviewEntity> listReview) {
        this.listReview = listReview;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }
    private List<ReviewEntity> listReview;
    private OrderEntity order;
};
