package ptit.tmdt.bansach.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ptit.tmdt.bansach.entity.ProductEntity;
import ptit.tmdt.bansach.repository.ProductRepository;

@CrossOrigin
@RequestMapping("/api")
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

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

}
