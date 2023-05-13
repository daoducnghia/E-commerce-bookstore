package ptit.tmdt.bansach.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.entity.ReviewEntity;
import ptit.tmdt.bansach.repository.ProductRepository;
import ptit.tmdt.bansach.repository.ReviewRepository;

@CrossOrigin
@RequestMapping("/api")
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @GetMapping("/search")
    public List<ProductEntity> searchProductByName(@RequestParam("name") String name) {
        try {
            System.out.println(name);
            List<ProductEntity> lProduct = (List<ProductEntity>) productRepository
                    .findAllByProductName("%" + name + "%");
            return lProduct;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @PostMapping("/get-all-product-by-id")
    public List<ProductEntity> getAllProductById(@RequestBody List<Integer> ids) {
        try {
            List<ProductEntity> lProduct = (List<ProductEntity>) productRepository.findAllById(ids);
            return lProduct;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @GetMapping("/products")
    public List<ProductEntity> showAllProduct() {
        try {
            List<ProductEntity> list = (List<ProductEntity>) productRepository.findAll();
            // System.out.println(list);
            return list;
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;
    }

    @GetMapping("/product")
    public Optional<ProductEntity> detailProduct(@RequestParam("id") int idProduct) {
        try {
            Optional<ProductEntity> productEntity = productRepository.findById(idProduct);
            return productEntity;
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }

    @GetMapping("/product-review")
    public List<ReviewEntity> showProductReview(@RequestParam("id") int idProduct) {
        try {
            List<ReviewEntity> list = reviewRepository.findByProductId(idProduct);
            return list;
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        return null;
    }

    @GetMapping("/get-top15-product")
    public List<ProductEntity> getTop15Product(@RequestParam("type") String type) {
        try {
            List<ProductEntity> list = new ArrayList<>();
            if (type.equalsIgnoreCase("banchay")) {
                list = productRepository.findAllBanChay();
            } else if (type.equalsIgnoreCase("moinhat")) {
                list = productRepository.findAllMoiNhat();
            } else {
                list = productRepository.findAllGiaTot();
            }
            return list;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }

    @GetMapping("/get-all-product")
    public List<ProductEntity> getAllProduct(@RequestParam("type") String type) {
        try {
            List<ProductEntity> list = (List<ProductEntity>) productRepository.findAll();
            list.sort(Comparator.comparing(ProductEntity::getProductId).reversed());
            if (type.equalsIgnoreCase("banchay")) {
                list.sort(Comparator.comparing(ProductEntity::getNumberOfProductSold).reversed());
            }
            if (type.equalsIgnoreCase("giathap")) {
                list.sort(Comparator.comparing(ProductEntity::getPrice));
            }
            if (type.equalsIgnoreCase("giacao")) {
                list.sort(Comparator.comparing(ProductEntity::getPrice).reversed());
            }
            return list;
        } catch (Exception e) {
            System.out.println(e);
        }
        return new ArrayList<>();
    }
}
